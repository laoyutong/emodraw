import type { DrawData, GraghDrawData, TextDrawData } from "@/type";
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from "@/config";

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

const drawGragh = (
  canvasCtx: CanvasRenderingContext2D,
  drawData: GraghDrawData
) => {
  const { type, x, y, width, height } = drawData;
  switch (type) {
    case "rectangle":
      canvasCtx.strokeRect(x, y, width, height);
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
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  canvasCtx.textBaseline = "bottom";
  canvasCtx.font = `${DEFAULT_FONT_SIZE}px  ${DEFAULT_FONT_FAMILY}`;
  lines.forEach((line, index) => {
    canvasCtx.fillText(line, x, y + DEFAULT_FONT_SIZE * (index + 1));
  });
};

const drawCanvas = (
  canvasCtx: CanvasRenderingContext2D,
  drawData: DrawData[]
) => {
  drawData.forEach((data) => {
    if (data.type === "text") {
      drawText(canvasCtx, data);
    } else {
      drawGragh(canvasCtx, data);
    }
  });
};

export default drawCanvas;
