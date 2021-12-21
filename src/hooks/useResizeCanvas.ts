import { RefObject, useEffect } from "react";
import { drawCanvas } from "@/util";

const useResizeCanvas = (
  canvasIns: RefObject<HTMLCanvasElement>,
  canvasCtx: RefObject<CanvasRenderingContext2D>
) => {
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasIns.current || !canvasCtx.current) {
        return;
      }
      canvasIns.current.width = window.innerWidth;
      canvasIns.current.height = window.innerHeight;
      drawCanvas(canvasCtx.current);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => document.removeEventListener("resize", resizeCanvas);
  }, []);
};

export default useResizeCanvas;
