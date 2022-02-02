import { CURSOR_CONFIG } from "@/config";

export type DrawType =
  | "selection"
  | "rectangle"
  | "circle"
  | "arrow"
  // | "image"
  | "text"
  | "diamond";

export type Coordinate = Record<"x" | "y", number>;

interface BaseDrawData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
}

export type DrawData =
  | TextDrawData
  | GraghDrawData
  | SelectionData
  | ArrowDrawData;

export interface TextDrawData extends BaseDrawData {
  type: "text";
  content: string;
  containerId: string | null;
}

export interface SelectionData extends BaseDrawData {
  type: "selection";
}

export interface ArrowDrawData extends BaseDrawData {
  type: "arrow";
}

export interface BoundElement {
  id: string;
  type: "arrow" | "text";
}

export interface GraghDrawData extends BaseDrawData {
  type: "rectangle" | "circle" | "diamond";
  boundElement: BoundElement[];
}

export type CursorType = typeof CURSOR_CONFIG[keyof typeof CURSOR_CONFIG];
