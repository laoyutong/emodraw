export type DrawType =
  | "selection"
  | "rectangle"
  | "circle"
  | "arrow"
  | "image"
  | "text"
  | "diamond";

export type Coordinate = Record<"x" | "y", number>;

export interface DrawData {
  id: string;
  type: DrawType;
  width: number;
  height: number;
  x: number;
  y: number;
}
