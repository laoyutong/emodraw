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
  getSelectionRectType,
  getClickText,
  splitContent,
} from "@/util";
import type { Coordinate, DrawData } from "@/type";

type MoveEventFn = (e: MouseEvent) => void;

const useHandleDraw = (canvasCtx: RefObject<CanvasRenderingContext2D>) => {
  const { drawType, setDrawType } = useContext(drawTypeContext);
  const { cursorType, setCursorType } = useContext(cursorTypeContext);
  const canMousemove = useRef(false);
  const hasSelected = useRef(false);
  const isSelection = useRef(false);
  const isSelectedArea = useRef(false);
  const resizePositon = useRef<"top" | "bottom">();
  const arrowResizeType = useRef<"head" | "foot">();
  const isMoveing = useRef(false);
  const coordinate = useRef<Coordinate>({ x: 0, y: 0 });
  const coordinateCache = useRef<Coordinate>({ x: 0, y: 0 });
  const lastResizeData = useRef<Coordinate>({ x: 0, y: 0 });

  const resetCanvas = () => {
    if (canvasCtx.current) {
      canvasCtx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawCanvas(canvasCtx.current);
    }
  };

  const singleElementResize = (
    selectedElement: DrawData,
    width: number,
    height: number
  ) => {
    if (selectedElement.type === "arrow") {
      if (arrowResizeType.current === "head") {
        selectedElement.width += width;
        selectedElement.height += height;
      } else {
        selectedElement.x += width;
        selectedElement.y += height;
        selectedElement.width -= width;
        selectedElement.height -= height;
      }
    } else if (cursorType === "nesw-resize") {
      if (resizePositon.current === "top") {
        selectedElement.y += height;
        selectedElement.width += width;
        selectedElement.height -= height;
      } else {
        selectedElement.height += height;
        selectedElement.x += width;
        selectedElement.width -= width;
      }
    } else if (cursorType === "nwse-resize") {
      if (resizePositon.current === "top") {
        selectedElement.x += width;
        selectedElement.y += height;
        selectedElement.width -= width;
        selectedElement.height -= height;
      } else {
        selectedElement.width += width;
        selectedElement.height += height;
      }
    }
  };

  const ManyElementsResize = (
    selectedElements: DrawData[],
    pageX: number,
    pageY: number
  ) => {
    const { x, y } = coordinateCache.current;
    const disX = pageX - x;
    const disY = pageY - y;
    const isDisXLarge = Math.abs(disX) > Math.abs(disY);
    let width = 0,
      height = 0;
    const movePoint: Coordinate = { x: 0, y: 0 };
    const otherPoint: Coordinate = { x: 0, y: 0 };
    const selectionData = history.getSelectionData()!;
    const selectionWidth = selectionData[0] - selectionData[1];
    const selectionHeight = selectionData[2] - selectionData[3];
    if (cursorType === "nesw-resize") {
      width = isDisXLarge ? -disY : disX;
      height = isDisXLarge ? disY : -disX;
      if (resizePositon.current === "top") {
        movePoint.x = selectionData[0];
        otherPoint.x = selectionData[1];
        movePoint.y = selectionData[3];
        otherPoint.y = selectionData[2];
      } else {
        movePoint.x = selectionData[1];
        otherPoint.x = selectionData[0];
        movePoint.y = selectionData[2];
        otherPoint.y = selectionData[3];
      }
    } else {
      width = isDisXLarge ? disY : disX;
      height = isDisXLarge ? disY : disX;
      if (resizePositon.current === "top") {
        movePoint.x = selectionData[1];
        otherPoint.x = selectionData[0];
        movePoint.y = selectionData[3];
        otherPoint.y = selectionData[2];
      } else {
        movePoint.x = selectionData[0];
        otherPoint.x = selectionData[1];
        movePoint.y = selectionData[2];
        otherPoint.y = selectionData[3];
      }
    }

    selectedElements.forEach((d) => {
      const rateX = Math.abs(d.x - otherPoint.x) / selectionWidth;
      const rateW = Math.abs(d.x + d.width - otherPoint.x) / selectionWidth;
      const rateY = Math.abs(d.y - otherPoint.y) / selectionHeight;
      const rateH = Math.abs(d.y + d.height - otherPoint.y) / selectionHeight;
      d.x += (width - lastResizeData.current.x) * rateX;
      d.y += (height - lastResizeData.current.y) * rateY;
      d.width += (width - lastResizeData.current.x) * (rateW - rateX);
      d.height += (height - lastResizeData.current.y) * (rateH - rateY);
    });
    lastResizeData.current = { x: width, y: height };
  };

  const resizeElement = (
    selectedElements: DrawData[],
    pageX: number,
    pageY: number
  ) => {
    if (selectedElements.length === 1) {
      singleElementResize(
        selectedElements[0],
        pageX - coordinate.current.x,
        pageY - coordinate.current.y
      );
    } else {
      ManyElementsResize(selectedElements, pageX, pageY);
    }
  };

  const moveElements = (
    selectedElements: DrawData[],
    width: number,
    height: number
  ) => {
    selectedElements.forEach((s) => {
      s.x += width;
      s.y += height;
    });
  };

  const createText = ({ x, y }: Coordinate, initialValue?: string) => {
    createTextArea(
      { x, y },
      (v) => {
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
          const id = nanoid();
          history.addDrawData({
            type: "text",
            id,
            x,
            y,
            content: v,
            width: Math.floor(maxWidth),
            height: lines.length * DEFAULT_FONT_SIZE,
            isSelected: false,
          });
          history.addOperateStack({ type: "ADD", selectedIds: id });
          history.storageDrawData();
          resetCanvas();
        }
      },
      initialValue
    );
  };

  const dblclickFn = useRef<(x: number, y: number) => void>();
  dblclickFn.current = (x: number, y: number) => {
    if (drawType === "selection") {
      const textElement = getClickText({ x, y });
      history.data.forEach((d) => (d.isSelected = false));
      if (textElement) {
        history.data = history.data.filter((d) => d.id !== textElement.id);
        createText({ x: textElement.x, y: textElement.y }, textElement.content);
      } else {
        createText({ x, y });
      }
      resetCanvas();
    }
  };

  useEffect(() => {
    const fn = ({ pageX, pageY }: MouseEvent) => {
      dblclickFn.current?.(pageX, pageY);
    };
    document.addEventListener("dblclick", fn);
    return () => document.removeEventListener("dblclick", fn);
  }, []);

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
      resetCanvas();
    }
    if (key === "Backspace") {
      history.delete();
      resetCanvas();
    }
  });

  const mousedownFn = useRef<MoveEventFn>();
  mousedownFn.current = (e: MouseEvent) => {
    const { pageX, pageY } = e;
    coordinate.current = coordinateCache.current = { x: pageX, y: pageY };
    if (drawType === "text") {
      setDrawType("selection");
      createText({ x: pageX, y: pageY });
    } else if (drawType === "selection") {
      canMousemove.current = true;
      // 批量移动选择元素
      if (isSelectedArea.current && isInSelectionArea(pageX, pageY)) {
        hasSelected.current = true;
        return;
      }
      // 调整选择元素的大小
      const rectType = getSelectionRectType({ x: pageX, y: pageY });
      if (rectType) {
        resizePositon.current = rectType[1];
        hasSelected.current = true;
        // 获取点击的是箭头的头部还是尾部
        const selectedData = history.data.filter((d) => d.isSelected);
        if (selectedData.length === 1 && selectedData[0].type === "arrow") {
          const arrowData = selectedData[0];
          arrowResizeType.current =
            (arrowData.height <= 0 && resizePositon.current === "top") ||
            (arrowData.height > 0 && resizePositon.current === "bottom")
              ? "head"
              : "foot";
        }
        return;
      }

      const id = getSelectionElement({ x: pageX, y: pageY });
      history.data.forEach((d) => (d.isSelected = false));
      hasSelected.current = false;
      if (id) {
        history.data.find((d) => d.id === id)!.isSelected = true;
        hasSelected.current = true;
        history.storageDrawData();
      } else {
        // 选择selection范围
        history.addDrawData({
          type: drawType,
          id: nanoid(),
          x: pageX,
          y: pageY,
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
        x: pageX,
        y: pageY,
        width: 0,
        height: 0,
        isSelected: false,
      });
    }
  };

  const mousemoveFn = useRef<MoveEventFn>();
  mousemoveFn.current = (e: MouseEvent) => {
    const { pageX, pageY } = e;
    // hover时改变cursor类型
    if (!canMousemove.current) {
      const rectType = getSelectionRectType({ x: pageX, y: pageY });
      if (rectType) {
        setCursorType(rectType[0]);
        return;
      }
      if (drawType === "selection") {
        const result = isSelectedArea.current
          ? isInSelectionArea(pageX, pageY)
          : getSelectionElement({
              x: pageX,
              y: pageY,
            });
        setCursorType(result ? CURSOR_CONFIG.move : CURSOR_CONFIG.default);
      }
      return;
    }
    const width = pageX - coordinate.current.x;
    const height = pageY - coordinate.current.y;
    // 移动、修改选择元素
    if (drawType === "selection" && hasSelected.current) {
      const selectedList = history.data.filter((d) => d.isSelected);
      if (["nesw-resize", "nwse-resize"].includes(cursorType)) {
        resizeElement(selectedList, pageX, pageY);
      } else {
        moveElements(selectedList, width, height);
      }

      if (pageX !== coordinate.current.x || pageY !== coordinate.current.y) {
        isMoveing.current = true;
        coordinate.current = {
          x: pageX,
          y: pageY,
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

  const mouseupFn = useRef<MoveEventFn>();
  mouseupFn.current = (e: MouseEvent) => {
    if (!canMousemove.current) {
      return;
    }
    canMousemove.current = false;
    const { pageX, pageY } = e;
    // 没有移动鼠标的情况
    // 改变和移动元素的情况
    if (pageX === coordinate.current.x && pageY === coordinate.current.y) {
      drawType !== "selection" && history.popDrawData();
      if (isMoveing.current) {
        history.addOperateStack({
          type: "MOVE",
          selectedIds: history.data
            .filter((d) => d.isSelected)
            .map((d) => d.id),
          payload: {
            x: pageX - coordinateCache.current.x,
            y: pageY - coordinateCache.current.y,
          },
        });
      } else {
        isSelectedArea.current = false;
      }
    } else {
      if (drawType !== "selection") {
        const activeData = history.data[history.data.length - 1];
        activeData.isSelected = true;
        history.addOperateStack({ type: "ADD", selectedIds: activeData.id });
        setDrawType("selection");
      } else {
        // 范围selection
        history.popDrawData();
      }
      resetCanvas();
    }
    if (
      drawType === "selection" &&
      !isMoveing.current &&
      !isSelection.current
    ) {
      history.data.forEach((d) => (d.isSelected = false));
      const id = getSelectionElement({ x: pageX, y: pageY });
      if (id) {
        history.data.find((d) => d.id === id)!.isSelected = true;
      } else {
        setCursorType(CURSOR_CONFIG.default);
      }
      resetCanvas();
    }
    isMoveing.current = false;
    isSelection.current = false;
    lastResizeData.current = { x: 0, y: 0 };
    history.storageDrawData();
  };

  useEffect(() => {
    const moveFn = (e: MouseEvent) => {
      mousemoveFn.current?.(e);
    };
    const downFn = (e: MouseEvent) => {
      mousedownFn.current?.(e);
    };
    const upFn = (e: MouseEvent) => {
      mouseupFn.current?.(e);
    };
    document.addEventListener("mousedown", downFn);
    document.addEventListener("mousemove", moveFn);
    document.addEventListener("mouseup", upFn);
    return () => {
      document.removeEventListener("mousedown", downFn);
      document.removeEventListener("mousemove", moveFn);
      document.removeEventListener("mouseup", upFn);
    };
  }, []);
};

export default useHandleDraw;
