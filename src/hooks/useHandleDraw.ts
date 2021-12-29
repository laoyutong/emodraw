import { RefObject, useContext, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import { useKeydown } from "./";
import { drawTypeContext, cursorTypeContext } from "@/context";
import { CURSOR_CONFIG, DEFAULT_FONT_SIZE } from "@/config";
import {
  drawCanvas,
  history,
  isInSelectionArea,
  createTextArea,
  getSelectionElement,
  getSelectionArea,
  splitContent,
} from "@/util";
import type { Coordinate } from "@/type";

const useHandleDraw = (canvasCtx: RefObject<CanvasRenderingContext2D>) => {
  const { drawType, setDrawType } = useContext(drawTypeContext);
  const { setCursorType } = useContext(cursorTypeContext);
  const canMousemove = useRef(false);
  const hasSelected = useRef(false);
  const isSelection = useRef(false);
  const isSelectedArea = useRef(false);
  const isMoveing = useRef(false);
  const coordinate = useRef<Coordinate>({ x: 0, y: 0 });

  const resetCanvas = () => {
    if (canvasCtx.current) {
      canvasCtx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawCanvas(canvasCtx.current);
    }
  };

  useEffect(() => {
    setCursorType(
      drawType === "selection" ? CURSOR_CONFIG.default : CURSOR_CONFIG.crosshair
    );
    if (drawType !== "selection") {
      history.data.forEach((d) => (d.isSelected = false));
    }
  }, [drawType]);

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
        // 批量移动选择元素
        if (isSelectedArea.current && isInSelectionArea(offsetX, offsetY)) {
          hasSelected.current = true;
          canMousemove.current = true;
          return;
        }
        const id = getSelectionElement({ x: offsetX, y: offsetY });
        history.data.forEach((d) => (d.isSelected = false));
        hasSelected.current = false;
        canMousemove.current = true;
        if (id) {
          history.data.find((d) => d.id === id)!.isSelected = true;
          hasSelected.current = true;
          history.storageDrawData();
        } else {
          // 选择selection范围
          history.addDrawData({
            type: drawType,
            id: nanoid(),
            x: offsetX,
            y: offsetY,
            width: 0,
            height: 0,
            isSelected: false,
          });
          resetCanvas();
        }
      } else {
        // 元素绘制的初始化
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
        // hover时改变cursor类型
        if (drawType === "selection") {
          const result = isSelectedArea.current
            ? isInSelectionArea(offsetX, offsetY)
            : getSelectionElement({
                x: offsetX,
                y: offsetY,
              });
          setCursorType(result ? CURSOR_CONFIG.move : CURSOR_CONFIG.default);
        }
        return;
      }
      const width = offsetX - coordinate.current.x;
      const height = offsetY - coordinate.current.y;
      // 移动选择元素
      if (drawType === "selection" && hasSelected.current) {
        const selectedList = history.data.filter((d) => d.isSelected);
        selectedList.forEach((s) => {
          s.x = s.x + width;
          s.y = s.y + height;
        });
        if (
          offsetX !== coordinate.current.x ||
          offsetY !== coordinate.current.y
        ) {
          isMoveing.current = true;
          coordinate.current = {
            x: offsetX,
            y: offsetY,
          };
        }
      } else {
        // 元素的绘制过程
        const activeDrawData = history.data[history.data.length - 1];
        if (activeDrawData.type !== "text") {
          activeDrawData.width = width;
          activeDrawData.height = height;
        }
        if (activeDrawData.type === "selection") {
          isSelection.current = true;
          const selectionIds = getSelectionArea(
            coordinate.current.x,
            coordinate.current.y,
            width,
            height
          );
          isSelectedArea.current = selectionIds.length > 1;
          history.data.forEach((d) => {
            d.isSelected = selectionIds.includes(d.id);
          });
        }
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
      const { offsetX, offsetY } = e;
      // 没有移动的情况
      if (
        offsetX === coordinate.current.x &&
        offsetY === coordinate.current.y
      ) {
        drawType !== "selection" && history.revokeDrawData();
        isSelectedArea.current = false;
      } else {
        if (drawType !== "selection") {
          history.data[history.data.length - 1].isSelected = true;
          setDrawType("selection");
        } else {
          history.revokeDrawData();
        }
        resetCanvas();
      }
      if (
        drawType === "selection" &&
        !isMoveing.current &&
        !isSelection.current
      ) {
        history.data.forEach((d) => (d.isSelected = false));
        const id = getSelectionElement({ x: offsetX, y: offsetY });
        if (id) {
          history.data.find((d) => d.id === id)!.isSelected = true;
        } else {
          setCursorType(CURSOR_CONFIG.default);
        }
        resetCanvas();
      }
      isMoveing.current = false;
      isSelection.current = false;
      history.storageDrawData();
    };
    document.addEventListener("mouseup", mouseupFn);
    return () => document.removeEventListener("mouseup", mouseupFn);
  }, [drawType]);
};

export default useHandleDraw;
