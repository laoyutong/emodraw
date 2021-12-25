import { RefObject, useContext, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import { useKeydown } from "./";
import { drawTypeContext } from "@/context/DrawTypeContext";
import { DEFAULT_FONT_SIZE } from "@/config";
import {
  drawCanvas,
  history,
  createTextArea,
  checkPoint,
  splitContent,
} from "@/util";
import type { Coordinate } from "@/type";

const useHandleDraw = (canvasCtx: RefObject<CanvasRenderingContext2D>) => {
  const { drawType, setDrawType } = useContext(drawTypeContext);
  const canMousemove = useRef(false);
  const coordinate = useRef<Coordinate>({ x: 0, y: 0 });

  const resetCanvas = () => {
    if (canvasCtx.current) {
      canvasCtx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawCanvas(canvasCtx.current);
    }
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
        setDrawType("selection");
        createTextArea(coordinate.current, (v) => {
          if (v.trim()) {
            const lines = splitContent(v);
            let maxWidth = 0;
            lines.forEach((line) => {
              if (canvasCtx.current) {
                const { width } = canvasCtx.current.measureText(line);
                if (width > maxWidth) {
                  maxWidth = width;
                }
              }
            });
            history.addDrawData({
              type: drawType,
              id: nanoid(),
              x: offsetX,
              y: offsetY,
              content: v,
              width: Math.floor(maxWidth),
              height: lines.length * DEFAULT_FONT_SIZE,
            });
            history.storageDrawData();
            resetCanvas();
          }
        });
      } else if (drawType === "selection") {
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
      const { offsetX, offsetY } = e;
      if (!canMousemove.current) {
        checkPoint({
          x: offsetX,
          y: offsetY,
        });
        return;
      }
      const activeDrawData = history.data[history.data.length - 1];
      if (activeDrawData.type !== "text") {
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
      setDrawType("selection");
      history.storageDrawData();
    };
    document.addEventListener("mouseup", mouseupFn);
    return () => document.removeEventListener("mouseup", mouseupFn);
  }, []);
};

export default useHandleDraw;
