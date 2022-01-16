import { useContext } from "react";
import { iconList, iconProps } from "./config";
import { Export, Delete } from "@icon-park/react";
import { mitt } from "@/util";
import ToolItem from "./ToolItem";
import { useKeydown } from "@/hooks";
import { drawTypeContext } from "@/context";
import style from "./style.module.less";
import classnames from "classnames";
import type { IconList } from "./type";

const Tool = (): JSX.Element => {
  const { drawType, setDrawType } = useContext(drawTypeContext);

  useKeydown((key) => {
    const index = +key - 1;
    if (!isNaN(index) && index !== -1 && index < iconList.length) {
      setDrawType(iconList[index].type);
    }
  });

  const renderIcon = (Icon: IconList[number]["Icon"], onClick: () => void) => {
    return (
      <div className={style["tool-item"]} onClick={onClick}>
        <Icon {...iconProps} />
      </div>
    );
  };

  const clearCanvas = () => {
    mitt.emit("clear");
  };

  const exportCanvas = () => {
    mitt.emit("export");
  };

  return (
    <>
      <div className={classnames(style["container"], style["element"])}>
        {iconList.map(({ Icon, type }, index) => (
          <ToolItem
            isActive={type === drawType}
            key={index}
            Icon={<Icon {...iconProps} />}
            index={index + 1}
            changeType={() => setDrawType(type)}
          />
        ))}
      </div>
      <div className={classnames(style["container"], style["operate"])}>
        {renderIcon(Delete, clearCanvas)}
        {renderIcon(Export, exportCanvas)}
      </div>
    </>
  );
};

export default Tool;
