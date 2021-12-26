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

  addDrawData(data: DrawData) {
    this.data.push(data);
  }

  revokeDrawData() {
    this.data.pop();
  }

  storageDrawData() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.data));
  }

  delete() {
    this.data = this.data.filter((item) => !item.isSelected);
    this.storageDrawData();
  }
}

export default new History();
