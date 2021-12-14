import { RefObject, useContext, useEffect, useRef } from "react";
import { useDrawData } from "./";
import { nanoid } from "nanoid";
import { drawCanvas } from "@/util";
import { drawTypeContext } from "@/context/DrawTypeContext";
import type { Coordinate, DrawData } from "@/type";

const useHandleDraw = (canvasCtx: RefObject<CanvasRenderingContext2D>) => {
  const { drawType } = useContext(drawTypeContext);
  const canMousemove = useRef(false);
  const coordinate = useRef<Coordinate>({ x: 0, y: 0 });
  const [drawData, { addDrawData, revokeDrawData, storageDrawData }] =
    useDrawData();

  useEffect(() => {
    resetCanvas();
  }, []);

  const resetCanvas = () => {
    canvasCtx.current?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawData.current && drawCanvas(canvasCtx, drawData.current);
  };

  useEffect(() => {
    const mousedownFn = (e: MouseEvent) => {
      canMousemove.current = true;
      const { offsetX, offsetY } = e;
      coordinate.current = { x: offsetX, y: offsetY };
      addDrawData({
        type: drawType,
        id: nanoid(),
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
      });
    };
    document.addEventListener("mousedown", mousedownFn);
    return () => document.removeEventListener("mousedown", mousedownFn);
  }, [drawType]);

  useEffect(() => {
    const mousemoveFn = (e: MouseEvent) => {
      if (!canMousemove.current || !drawData.current) {
        return;
      }
      const { offsetX, offsetY } = e;
      drawData.current[drawData.current.length - 1].width =
        offsetX - coordinate.current.x;
      drawData.current[drawData.current.length - 1].height =
        offsetY - coordinate.current.y;
      resetCanvas();
    };
    document.addEventListener("mousemove", mousemoveFn);
    return () => document.removeEventListener("mousemove", mousemoveFn);
  }, []);

  useEffect(() => {
    const mouseupFn = (e: MouseEvent) => {
      canMousemove.current = false;
      if (
        e.offsetX === coordinate.current.x &&
        e.offsetY === coordinate.current.y
      ) {
        revokeDrawData();
      }
      storageDrawData();
    };
    document.addEventListener("mouseup", mouseupFn);
    return () => document.removeEventListener("mouseup", mouseupFn);
  }, []);
};

export default useHandleDraw;
