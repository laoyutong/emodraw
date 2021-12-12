import { RefObject, useEffect } from "react";

const useResizeCanvas = (canvasIns: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasIns.current) {
        return;
      }
      canvasIns.current.width = window.innerWidth;
      canvasIns.current.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => document.removeEventListener("resize", resizeCanvas);
  }, []);
};

export default useResizeCanvas;
