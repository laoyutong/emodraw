import { LOCAL_STORAGE_KEY } from "@/config";
import type { DrawData } from "@/type";

class History {
  data: DrawData[];

  constructor() {
    this.data = this._getStorageData();
  }

  private _getStorageData(): DrawData[] {
    let storageData;
    try {
      storageData =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string) || [];
    } catch (_) {
      storageData = [];
      localStorage.setItem(LOCAL_STORAGE_KEY, "[]");
    }
    return storageData;
  }

  getSelectionData(): [number, number, number, number, boolean] {
    let x1 = -Infinity;
    let y1 = -Infinity;
    let x2 = Infinity;
    let y2 = Infinity;
    const selectedList = this.data.filter((d) => d.isSelected);
    if (selectedList.length === 1 && selectedList[0].type === "arrow") {
      const arrowData = selectedList[0];
      return [
        arrowData.x,
        arrowData.x + arrowData.width,
        arrowData.y,
        arrowData.y + arrowData.height,
        true,
      ];
    }

    selectedList.forEach((data) => {
      const [maxDataX, minDataX] =
        data.width > 0
          ? [data.x + data.width, data.x]
          : [data.x, data.x + data.width];
      const [maxDataY, minDataY] =
        data.height > 0
          ? [data.y + data.height, data.y]
          : [data.y, data.y + data.height];

      if (maxDataX > x1) {
        x1 = maxDataX;
      }
      if (maxDataY > y1) {
        y1 = maxDataY;
      }
      if (minDataX < x2) {
        x2 = minDataX;
      }
      if (minDataY < y2) {
        y2 = minDataY;
      }
    });
    return [x1, x2, y1, y2, false];
  }

  addDrawData(data: DrawData) {
    this.data.push(data);
  }

  revokeDrawData() {
    this.data.pop();
  }

  storageDrawData() {
    this.data = this.data
      .filter((d) => d.type !== "selection")
      .map((d) => {
        if (d.type === "arrow") {
          return d;
        }
        const handledItem = { ...d };
        if (handledItem.width < 0) {
          handledItem.x = handledItem.x + handledItem.width;
          handledItem.width = -handledItem.width;
        }
        if (handledItem.height < 0) {
          handledItem.y = handledItem.y + handledItem.height;
          handledItem.height = -handledItem.height;
        }
        return handledItem;
      });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.data));
  }

  delete() {
    this.data = this.data.filter((item) => !item.isSelected);
    this.storageDrawData();
  }
}

export default new History();
