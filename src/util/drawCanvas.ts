import { RefObject } from "react";
import { DrawData } from "@/type";

const drawCanvas = (
  canvasCtx: RefObject<CanvasRenderingContext2D>,
  drawData: DrawData[]
) => {
  drawData.forEach(({ type, x, y, width, height }) => {
    if (type === "rectangle") {
      canvasCtx.current?.strokeRect(x, y, width, height);
    }
  });
};

export default drawCanvas;
