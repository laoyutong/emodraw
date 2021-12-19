export type DrawType =
  // | "selection"
  | "rectangle"
  | "circle"
  // | "arrow"
  // | "image"
  | "text"
  | "diamond";

export type Coordinate = Record<"x" | "y", number>;

interface BaseDrawData {
  id: string;
  x: number;
  y: number;
}

export type DrawData = TextDrawData | GraghDrawData;

export interface TextDrawData extends BaseDrawData {
  type: "text";
  content: string;
}

export interface GraghDrawData extends BaseDrawData {
  type: "rectangle" | "circle" | "diamond";
  width: number;
  height: number;
}
