import { RefObject, useContext, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import { useKeydown } from "./";
import { drawTypeContext } from "@/context/DrawTypeContext";
import { drawCanvas, history, createTextArea } from "@/util";
import type { Coordinate } from "@/type";

const useHandleDraw = (canvasCtx: RefObject<CanvasRenderingContext2D>) => {
  const { drawType } = useContext(drawTypeContext);
  const canMousemove = useRef(false);
  const coordinate = useRef<Coordinate>({ x: 0, y: 0 });

  const resetCanvas = () => {
    canvasCtx.current?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvasCtx.current && drawCanvas(canvasCtx.current);
  };

  useKeydown((key, metaKey) => {
    if (metaKey && key === "z") {
      history.revokeDrawData();
      history.storageDrawData();
      resetCanvas();
    }
  });

  useEffect(() => {
    const mousedownFn = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;
      coordinate.current = { x: offsetX, y: offsetY };
      if (drawType === "text") {
        createTextArea(coordinate.current, (v) => {
          if (v.trim()) {
            history.addDrawData({
              type: drawType,
              id: nanoid(),
              x: offsetX,
              y: offsetY,
              content: v,
            });
            history.storageDrawData();
            resetCanvas();
          }
        });
      } else {
        canMousemove.current = true;
        history.addDrawData({
          type: drawType,
          id: nanoid(),
          x: offsetX,
          y: offsetY,
          width: 0,
          height: 0,
        });
      }
    };
    document.addEventListener("mousedown", mousedownFn);
    return () => document.removeEventListener("mousedown", mousedownFn);
  }, [drawType]);

  useEffect(() => {
    const mousemoveFn = (e: MouseEvent) => {
      if (!canMousemove.current) {
        return;
      }
      const activeDrawData = history.data[history.data.length - 1];
      const { offsetX, offsetY } = e;
      if (activeDrawData.type === "text") {
      } else {
        activeDrawData.width = offsetX - coordinate.current.x;
        activeDrawData.height = offsetY - coordinate.current.y;
      }
      resetCanvas();
    };
    document.addEventListener("mousemove", mousemoveFn);
    return () => document.removeEventListener("mousemove", mousemoveFn);
  }, []);

  useEffect(() => {
    const mouseupFn = (e: MouseEvent) => {
      if (!canMousemove.current) {
        return;
      }
      canMousemove.current = false;
      if (
        e.offsetX === coordinate.current.x &&
        e.offsetY === coordinate.current.y
      ) {
        history.revokeDrawData();
      }
      history.storageDrawData();
    };
    document.addEventListener("mouseup", mouseupFn);
    return () => document.removeEventListener("mouseup", mouseupFn);
  }, []);
};

export default useHandleDraw;
