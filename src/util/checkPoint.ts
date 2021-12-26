import { history } from "@/util";
import type { Coordinate } from "@/type";

const GAP = 5;

const getSmall = (x: number) => (x > GAP ? x - GAP : 0);

const getBigX = (x: number) =>
  x + GAP < window.innerWidth ? x + GAP : window.innerWidth;

const getBigY = (y: number) =>
  y + GAP < window.innerWidth ? y + GAP : window.innerWidth;

const isRange = (v: number, s: number, b: number) => v >= getSmall(s) && v <= b;

const checkPoint = ({ x, y }: Coordinate) => {
  for (let i = 0; i < history.data.length; i++) {
    const data = history.data[i];
    switch (data.type) {
      case "text":
        if (
          isRange(x, data.x, getBigX(data.x + data.width)) &&
          isRange(y, data.y, getBigY(data.y + data.height))
        ) {
          console.log("text");
          return true;
        }
      case "rectangle":
        const x1 = data.x;
        const x2 = data.x + data.width;
        const y1 = data.y;
        const y2 = data.y + data.height;
        if (
          ((isRange(x, x1, getBigX(x1)) || isRange(x, x2, getBigX(x2))) &&
            isRange(y, y1, getBigY(y2))) ||
          ((isRange(y, y1, getBigY(y1)) || isRange(y, y2, getBigY(y2))) &&
            isRange(x, x1, getBigX(x2)))
        ) {
          console.log("rectangle");
          return true;
        }
      case "diamond":
        const targetArea = data.width * data.height;
        const disX = Math.abs(x - (data.x + data.width / 2));
        const disY = Math.abs(y - (data.y + data.height / 2));
        const maxArea =
          ((disX + GAP) * data.height + (disY + GAP) * data.width) * 2;
        const minArea =
          ((disX - GAP) * data.height + (disY - GAP) * data.width) * 2;
        if (maxArea >= targetArea && minArea <= targetArea) {
          console.log("diamond");
          return true;
        }
      case "circle":
        const centerX = data.x + data.width / 2;
        const centerY = data.y + data.height / 2;
        const lengthX = Math.abs(data.width / 2);
        const lengthY = Math.abs(data.height / 2);
        const step = lengthX > lengthY ? 1 / lengthX : 1 / lengthY;
        for (let i = 0; i < Math.PI * 2; i += step) {
          const x1 = Math.round(centerX + lengthX * Math.cos(i));
          const y1 = Math.round(centerY + lengthY * Math.sin(i));
          if (isRange(x, x1, getBigX(x1)) && isRange(y, y1, getBigY(y1))) {
            console.log("circle");
            return true;
          }
        }
    }
  }
  return false;
};

export default checkPoint;
