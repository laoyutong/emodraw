import { RefObject } from "react";
import { DrawData } from "@/type";

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

const drawCanvas = (
  canvasCtx: RefObject<CanvasRenderingContext2D>,
  drawData: DrawData[]
) => {
  drawData.forEach(({ type, x, y, width, height }) => {
    if (!canvasCtx.current) {
      return;
    }
    switch (type) {
      case "rectangle":
        canvasCtx.current.strokeRect(x, y, width, height);
        return;
      case "circle":
        drawEllipse(
          canvasCtx.current,
          x + width / 2,
          y + height / 2,
          Math.abs(width / 2),
          Math.abs(height / 2)
        );
        return;
      case "diamond":
        drawDiamond(canvasCtx.current, x, y, width, height);
        return;
    }
  });
};

export default drawCanvas;
