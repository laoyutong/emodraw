import {
  Click,
  RectangleOne,
  Round,
  DiamondThree,
  FontSizeTwo,
  RightTwo,
  Pic,
} from "@icon-park/react";
import type { IconProps, IconList } from "./type";

export const iconProps: IconProps = {
  theme: "outline",
  size: "20",
  fill: "#333",
};

export const iconList: IconList = [
  { type: "selection", Icon: Click },
  { type: "rectangle", Icon: RectangleOne },
  { type: "circle", Icon: Round },
  { type: "diamond", Icon: DiamondThree },
  { type: "text", Icon: FontSizeTwo },
  { type: "arrow", Icon: RightTwo },
  { type: "image", Icon: Pic },
];
