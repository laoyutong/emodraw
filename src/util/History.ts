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

  getSelectionData() {
    let x1 = -Infinity;
    let y1 = -Infinity;
    let x2 = Infinity;
    let y2 = Infinity;
    this.data
      .filter((d) => d.isSelected)
      .forEach((data) => {
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
    return [x1, x2, y1, y2];
  }

  addDrawData(data: DrawData) {
    this.data.push(data);
  }

  revokeDrawData() {
    this.data.pop();
  }

  storageDrawData() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(this.data.filter((d) => d.type !== "selection"))
    );
  }

  delete() {
    this.data = this.data.filter((item) => !item.isSelected);
    this.storageDrawData();
  }
}

export default new History();
