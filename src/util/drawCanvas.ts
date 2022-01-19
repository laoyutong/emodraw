import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  ARROW_LENGTH,
  SELECTION_GAP,
  SELECTION_RECT_WIDTH,
  SELECTION_LINE_DASH,
} from "@/config";
import { history, splitContent } from "@/util";
import type { DrawData, GraghDrawData, TextDrawData } from "@/type";

const drawRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.closePath();
  ctx.stroke();
};

const drawSelection = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.save();
  ctx.fillStyle = "rgba(255,165,0,0.5)";
  ctx.fillRect(x, y, width, height);
  ctx.restore();
};

const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const step = width > height ? 1 / width : 1 / height;
  ctx.beginPath();
  ctx.moveTo(x + width, y);
  for (let i = 0; i < Math.PI * 2; i += step) {
    ctx.lineTo(x + width * Math.cos(i), y + height * Math.sin(i));
  }
  ctx.closePath();
  ctx.stroke();
};

const drawDiamond = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y + height);
  ctx.lineTo(x + width, y + height / 2);
  ctx.lineTo(x + width / 2, y);
  ctx.lineTo(x, y + height / 2);
  ctx.closePath();
  ctx.stroke();
};

const getAngle = (x: number, y: number) =>
  Math.floor(180 / (Math.PI / Math.atan(x / y)));

const ARROW_DEG = 30;

const drawArrow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const arrowLength = Math.min(
    Math.pow(width * width + height * height, 1 / 2) / 2,
    ARROW_LENGTH
  );
  const directionLength = height < 0 ? -arrowLength : arrowLength;

  const angle = getAngle(width, height);
  const angleA = angle + ARROW_DEG;
  const angleB = angle - ARROW_DEG;
  const targetX = x + width;
  const targetY = y + height;

  const x1 = targetX - directionLength * Math.sin((Math.PI * angleA) / 180);
  const y1 = targetY - directionLength * Math.cos((Math.PI * angleA) / 180);
  const x2 = targetX - directionLength * Math.sin((Math.PI * angleB) / 180);
  const y2 = targetY - directionLength * Math.cos((Math.PI * angleB) / 180);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(targetX, targetY);
  ctx.lineTo(x1, y1);
  ctx.moveTo(targetX, targetY);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

const drawGragh = (
  canvasCtx: CanvasRenderingContext2D,
  drawData: GraghDrawData
) => {
  const { type, x, y, width, height } = drawData;
  switch (type) {
    case "rectangle":
      drawRect(canvasCtx, x, y, width, height);
      return;
    case "circle":
      drawEllipse(
        canvasCtx,
        x + width / 2,
        y + height / 2,
        Math.abs(width / 2),
        Math.abs(height / 2)
      );
      return;
    case "arrow":
      drawArrow(canvasCtx, x, y, width, height);
      return;
    case "diamond":
      drawDiamond(canvasCtx, x, y, width, height);
      return;
    case "selection":
      drawSelection(canvasCtx, x, y, width, height);
      return;
  }
};

const drawText = (
  canvasCtx: CanvasRenderingContext2D,
  drawData: TextDrawData
) => {
  const { content, x, y } = drawData;
  canvasCtx.textBaseline = "bottom";
  canvasCtx.font = `${DEFAULT_FONT_SIZE}px  ${DEFAULT_FONT_FAMILY}`;
  splitContent(content).forEach((line, index) => {
    canvasCtx.fillText(line, x, y + DEFAULT_FONT_SIZE * (index + 1));
  });
};

const drawSelectedArea = (
  ctx: CanvasRenderingContext2D,
  {
    x,
    y,
    width,
    height,
    type,
  }: Pick<DrawData, "x" | "y" | "width" | "height" | "type">,
  isSelectionArea: boolean
) => {
  const gapX = width > 0 ? SELECTION_GAP : -SELECTION_GAP;
  const gapY = height > 0 ? SELECTION_GAP : -SELECTION_GAP;
  const x1 = x - gapX;
  const x2 = x + width + gapX;
  const y1 = y - gapY;
  const y2 = y + height + gapY;
  ctx.setLineDash(SELECTION_LINE_DASH);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x1, y2);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
  if (!isSelectionArea) {
    const rectWidth = width > 0 ? SELECTION_RECT_WIDTH : -SELECTION_RECT_WIDTH;
    const rectHeight =
      height > 0 ? SELECTION_RECT_WIDTH : -SELECTION_RECT_WIDTH;
    if (type !== "text") {
      drawRect(ctx, x1, y1, -rectWidth, -rectHeight);
      drawRect(ctx, x2, y2, rectWidth, rectHeight);
      if (type !== "arrow") {
        drawRect(ctx, x2, y1, rectWidth, -rectHeight);
        drawRect(ctx, x1, y2, -rectWidth, rectHeight);
      }
    }
  }
};

const drawSelectionArea = (canvasCtx: CanvasRenderingContext2D) => {
  const result = history.getSelectionData();
  if (!result) {
    return;
  }
  const [x1, x2, y1, y2] = result;
  drawSelectedArea(
    canvasCtx,
    { x: x1, y: y1, width: x2 - x1, height: y2 - y1, type: "selection" },
    false
  );
};

const drawCanvas = (
  canvasCtx: CanvasRenderingContext2D,
  data: DrawData[] = history.data
) => {
  let isSelectionArea = false;
  const selectedList = history.data.filter((d) => d.isSelected);
  if (selectedList.length > 1) {
    drawSelectionArea(canvasCtx);
    isSelectionArea = true;
  }
  data.forEach((d) => {
    d.isSelected && drawSelectedArea(canvasCtx, d, isSelectionArea);
    if (d.type === "text") {
      drawText(canvasCtx, d);
    } else {
      drawGragh(canvasCtx, d);
    }
  });
};

export default drawCanvas;
