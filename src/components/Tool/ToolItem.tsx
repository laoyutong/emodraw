import { ReactNode } from "react";
import classnames from "classnames";
import style from "./style.module.less";

interface ToolItemProps {
  Icon: ReactNode;
  index: number;
  changeType: () => void;
  isActive: boolean;
}

const ToolItem = ({
  Icon,
  index,
  changeType,
  isActive,
}: ToolItemProps): JSX.Element => {
  return (
    <div
      className={classnames(style["tool-item"], {
        [style["active"]]: isActive,
      })}
      onClick={changeType}
    >
      <div className={style["tool-icon"]}>{Icon}</div>
      <div className={style["tool-index"]}>{index}</div>
    </div>
  );
};

export default ToolItem;
