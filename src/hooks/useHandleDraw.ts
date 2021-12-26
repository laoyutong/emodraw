import { RefObject, useContext, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import { useKeydown } from "./";
import { drawTypeContext, cursorTypeContext } from "@/context";
import { CURSOR_CONFIG, DEFAULT_FONT_SIZE } from "@/config";
import {
  drawCanvas,
  history,
  createTextArea,
  getSelectionElement,
  splitContent,
} from "@/util";
import type { Coordinate } from "@/type";

const useHandleDraw = (canvasCtx: RefObject<CanvasRenderingContext2D>) => {
  const { drawType, setDrawType } = useContext(drawTypeContext);
  const { setCursorType } = useContext(cursorTypeContext);
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
    if (key === "Backspace") {
      history.delete();
      resetCanvas();
    }
  });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (drawType !== "selection") {
        return;
      }
      history.data.forEach((item) => (item.isSelected = false));
      const { offsetX, offsetY } = e;
      const id = getSelectionElement({ x: offsetX, y: offsetY });
      if (id) {
        history.data.find((item) => item.id === id)!.isSelected = true;
        history.storageDrawData();
      }
      resetCanvas();
    };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, [drawType]);

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
              isSelected: false,
            });
            history.storageDrawData();
            resetCanvas();
          }
        });
      } else if (drawType === "selection") {
        // todo
      } else {
        canMousemove.current = true;
        history.addDrawData({
          type: drawType,
          id: nanoid(),
          x: offsetX,
          y: offsetY,
          width: 0,
          height: 0,
          isSelected: false,
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
        if (drawType === "selection") {
          const result = getSelectionElement({
            x: offsetX,
            y: offsetY,
          });
          setCursorType(result ? CURSOR_CONFIG.move : CURSOR_CONFIG.default);
        }
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
  }, [drawType]);

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
