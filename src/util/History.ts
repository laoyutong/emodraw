import { LOCAL_STORAGE_KEY } from "@/config";
import type { DrawData } from "@/type";

type OperateType = "ADD" | "MOVE" | "RESIZE" | "DELETE";

interface OperateStack {
  type: OperateType;
  selectedIds?: string[] | string;
  payload?: Partial<DrawData>[] | Partial<DrawData>;
}

interface AddOperate {
  type: "ADD";
  selectedIds: string;
}

interface DeleteOperate {
  type: "DELETE";
  payload: DrawData[];
}

interface MoveOperate {
  type: "MOVE";
  selectedIds: string[];
  payload: Pick<DrawData, "x" | "y">;
}

interface ResizeOperate {
  type: "RESIZE";
  selectedIds: string[];
  payload: DrawData;
}

class History {
  data: DrawData[];
  #operateStack: OperateStack[];

  constructor() {
    this.data = this.#getStorageData();
    this.#operateStack = [];
  }

  addOperateStack(operate: AddOperate): void;
  addOperateStack(operate: DeleteOperate): void;
  addOperateStack(operate: MoveOperate): void;
  addOperateStack(operate: ResizeOperate): void;
  addOperateStack(operate: OperateStack) {
    this.#operateStack.push(operate);
    console.log("operateStack:::", this.#operateStack);
  }

  #getStorageData(): DrawData[] {
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

  popDrawData() {
    this.data.pop();
  }

  revokeDrawData() {
    if (this.#operateStack.length > 0) {
      const operate = this.#operateStack.pop()!;
      if (operate.type === "DELETE") {
        this.data.push(...(operate.payload as DeleteOperate["payload"]));
      }
      if (operate.type === "ADD") {
        this.data = this.data.filter((d) => operate.selectedIds !== d.id);
      }
      if (operate.type === "MOVE") {
        const { x, y } = operate.payload as MoveOperate["payload"];
        this.data
          .filter((d) =>
            (operate.selectedIds as MoveOperate["selectedIds"]).includes(d.id)
          )
          .forEach((d) => {
            d.x -= x;
            d.y -= y;
            d.isSelected = true;
          });
      }
      if (operate.type === "RESIZE") {
        // TODO
      }
      this.storageDrawData();
    }
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
    const deleteList: DrawData[] = [];
    this.data = this.data.filter((item) => {
      if (item.isSelected) {
        deleteList.push({ ...item, isSelected: false });
        return false;
      } else {
        return true;
      }
    });
    this.addOperateStack({ type: "DELETE", payload: deleteList });
    this.storageDrawData();
  }
}

export default new History();
