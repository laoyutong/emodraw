import { ReactNode } from "react";
import classnames from "classnames";
import style from "./style.module.less";

interface ToolItemProps {
  Icon: ReactNode;
  index: number;
  changeIndex: (index: number) => void;
  isActive: boolean;
}

const ToolItem = ({
  Icon,
  index,
  changeIndex,
  isActive,
}: ToolItemProps): JSX.Element => {
  return (
    <div
      className={classnames(style["tool-item"], {
        [style["active"]]: isActive,
      })}
      onClick={() => changeIndex(index)}
    >
      <div className={style["tool-icon"]}>{Icon}</div>
      <div className={style["tool-index"]}>{index}</div>
    </div>
  );
};

export default ToolItem;
