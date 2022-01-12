import { history } from "@/util";
import { SELECTION_RECT_WIDTH, SELECTION_GAP, CURSOR_CONFIG } from "@/config";
import type { Coordinate, CursorType, TextDrawData } from "@/type";

const GAP = 5;

const getSmall = (x: number) => (x > GAP ? x - GAP : 0);

const getBigX = (x: number) =>
  x + GAP < window.innerWidth ? x + GAP : window.innerWidth;

const getBigY = (y: number) =>
  y + GAP < window.innerWidth ? y + GAP : window.innerWidth;

const isRange = (v: number, s: number, b: number) => v >= getSmall(s) && v <= b;

const getDistance = (x1: number, x2: number, y1: number, y2: number) =>
  Math.pow(
    Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2),
    1 / 2
  );

export const getSelectionElement = ({ x, y }: Coordinate): string | null => {
  for (let i = 0; i < history.data.length; i++) {
    const data = history.data[i];
    const x1 = data.x;
    const x2 = data.x + data.width;
    const y1 = data.y;
    const y2 = data.y + data.height;

    if (data.isSelected) {
      const largeX = data.width > 0 ? x2 : x1;
      const smallX = data.width > 0 ? x1 : x2;
      const largeY = data.height > 0 ? y2 : y1;
      const smallY = data.height > 0 ? y1 : y2;
      if (x >= smallX && x <= largeX && y >= smallY && y <= largeY) {
        return data.id;
      }
    }

    if (
      data.type === "text" &&
      isRange(x, x1, getBigX(x2)) &&
      isRange(y, y1, getBigY(y2))
    ) {
      return data.id;
    }

    if (
      data.type === "rectangle" &&
      (((isRange(x, x1, getBigX(x1)) || isRange(x, x2, getBigX(x2))) &&
        isRange(y, y1, getBigY(y2))) ||
        ((isRange(y, y1, getBigY(y1)) || isRange(y, y2, getBigY(y2))) &&
          isRange(x, x1, getBigX(x2))))
    ) {
      return data.id;
    }

    if (data.type === "diamond") {
      const targetArea = data.width * data.height;
      const disX = Math.abs(x - (x1 + data.width / 2));
      const disY = Math.abs(y - (y1 + data.height / 2));
      const maxArea =
        ((disX + GAP) * data.height + (disY + GAP) * data.width) * 2;
      const minArea =
        ((disX - GAP) * data.height + (disY - GAP) * data.width) * 2;
      if (maxArea >= targetArea && minArea <= targetArea) {
        return data.id;
      }
    }

    if (data.type === "circle") {
      const centerX = x1 + data.width / 2;
      const centerY = y1 + data.height / 2;
      const lengthX = Math.abs(data.width / 2);
      const lengthY = Math.abs(data.height / 2);
      const step = lengthX > lengthY ? 1 / lengthX : 1 / lengthY;
      for (let i = 0; i < Math.PI * 2; i += step) {
        const x1 = Math.round(centerX + lengthX * Math.cos(i));
        const y1 = Math.round(centerY + lengthY * Math.sin(i));
        if (isRange(x, x1, getBigX(x1)) && isRange(y, y1, getBigY(y1))) {
          return data.id;
        }
      }
    }

    if (data.type === "arrow") {
      const target = Math.round(getDistance(x1, x2, y1, y2));
      const active = Math.round(
        getDistance(x, x1, y, y1) + getDistance(x, x2, y, y2)
      );
      if (active >= target - GAP / 2 && active <= target + GAP / 2) {
        return data.id;
      }
    }
  }
  return null;
};

export const getSelectionArea = (
  x: number,
  y: number,
  width: number,
  height: number
): string[] => {
  const [maxX, minX] = width > 0 ? [x + width, x] : [x, x + width];
  const [maxY, minY] = height > 0 ? [y + height, y] : [y, y + height];
  return history.data
    .filter((data) => {
      if (data.type === "selection") {
        return false;
      }
      const [maxDataX, minDataX] =
        data.width > 0
          ? [data.x + data.width, data.x]
          : [data.x, data.x + data.width];
      const [maxDataY, minDataY] =
        data.height > 0
          ? [data.y + data.height, data.y]
          : [data.y, data.y + data.height];

      if (
        maxX >= maxDataX &&
        minX <= minDataX &&
        maxY >= maxDataY &&
        minY <= minDataY
      ) {
        return true;
      }
      return false;
    })
    .map(({ id }) => id);
};

export const isInSelectionArea = (offsetX: number, offsetY: number) => {
  const selectionData = history.getSelectionData();
  if (!selectionData) {
    return false;
  }
  const [x1, x2, y1, y2] = selectionData;
  return offsetX <= x1 && offsetX >= x2 && offsetY <= y1 && offsetY >= y2;
};

const isInRectSelection = (v1: number, v2: number, isAdd: boolean) => {
  return isAdd
    ? v1 >= v2 + SELECTION_GAP &&
        v1 <= v2 + SELECTION_RECT_WIDTH + SELECTION_GAP
    : v1 <= v2 - SELECTION_GAP &&
        v1 >= v2 - SELECTION_RECT_WIDTH - SELECTION_GAP;
};

export const getSelectionRectType = ({
  x,
  y,
}: Coordinate): [CursorType, "top" | "bottom"] | null => {
  const selectionData = history.getSelectionData();
  if (!selectionData) {
    return null;
  }
  const [x1, x2, y1, y2, isArrowSelected] = selectionData;
  if (isArrowSelected) {
    if (x1 >= x2 && y1 > y2) {
      if (isInRectSelection(x, x2, false) && isInRectSelection(y, y2, false)) {
        return [CURSOR_CONFIG.nwseResize, "top"];
      }

      if (isInRectSelection(x, x1, true) && isInRectSelection(y, y1, true)) {
        return [CURSOR_CONFIG.nwseResize, "bottom"];
      }
    } else if (x1 >= x2 && y1 < y2) {
      if (isInRectSelection(x, x2, false) && isInRectSelection(y, y2, true)) {
        return [CURSOR_CONFIG.neswResize, "bottom"];
      }

      if (isInRectSelection(x, x1, true) && isInRectSelection(y, y1, false)) {
        return [CURSOR_CONFIG.neswResize, "top"];
      }
    } else if (x1 < x2 && y1 > y2) {
      if (isInRectSelection(x, x2, true) && isInRectSelection(y, y2, false)) {
        return [CURSOR_CONFIG.neswResize, "top"];
      }

      if (isInRectSelection(x, x1, false) && isInRectSelection(y, y1, true)) {
        return [CURSOR_CONFIG.neswResize, "bottom"];
      }
    } else {
      if (isInRectSelection(x, x1, false) && isInRectSelection(y, y1, false)) {
        return [CURSOR_CONFIG.nwseResize, "top"];
      }

      if (isInRectSelection(x, x2, true) && isInRectSelection(y, y2, true)) {
        return [CURSOR_CONFIG.nwseResize, "bottom"];
      }
    }
    return null;
  }

  if (isInRectSelection(x, x2, false) && isInRectSelection(y, y2, false)) {
    return [CURSOR_CONFIG.nwseResize, "top"];
  }
  if (isInRectSelection(x, x1, true) && isInRectSelection(y, y1, true)) {
    return [CURSOR_CONFIG.nwseResize, "bottom"];
  }

  if (isInRectSelection(x, x2, false) && isInRectSelection(y, y1, true)) {
    return [CURSOR_CONFIG.neswResize, "bottom"];
  }
  if (isInRectSelection(x, x1, true) && isInRectSelection(y, y2, false)) {
    return [CURSOR_CONFIG.neswResize, "top"];
  }
  return null;
};

export const getClickText = ({ x, y }: Coordinate): TextDrawData | null => {
  const textList = history.data.filter((d) => d.type === "text");
  for (let i = 0; i < textList.length; i++) {
    const d = textList[i];
    if (x >= d.x && x <= d.x + d.width && y >= d.y && y <= d.y + d.height) {
      return d as TextDrawData;
    }
  }
  return null;
};
