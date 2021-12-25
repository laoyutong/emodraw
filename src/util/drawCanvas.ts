import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, ARROW_LENGTH } from "@/config";
import { history, splitContent } from "@/util";
import type { GraghDrawData, TextDrawData } from "@/type";

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
  const angleA = angle + 23;
  const angleB = angle - 27;
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

const drawCanvas = (canvasCtx: CanvasRenderingContext2D) => {
  history.data.forEach((data) => {
    if (data.type === "text") {
      drawText(canvasCtx, data);
    } else {
      drawGragh(canvasCtx, data);
    }
  });
};

export default drawCanvas;
