import type { Icon, Theme } from "@icon-park/react/lib/runtime";
import type { DrawType } from "@/type";
export interface IconProps {
  theme: Theme;
  fill: string;
  size: string;
}

export type IconList = {
  type: DrawType;
  Icon: Icon;
}[];
