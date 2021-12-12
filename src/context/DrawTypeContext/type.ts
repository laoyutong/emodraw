import type { DrawType } from "@/type";

export interface DrawTypeContextValue {
  drawType: DrawType;
  setDrawType: (type: DrawType) => void;
}
