import { useContext, useEffect } from "react";
import { iconList, iconProps } from "./config";
import ToolItem from "./ToolItem";
import { useKeydown } from "@/hooks";
import { CURSOR_CONFIG } from "@/config";
import { drawTypeContext, cursorTypeContext } from "@/context";
import style from "./style.module.less";

const Tool = (): JSX.Element => {
  const { drawType, setDrawType } = useContext(drawTypeContext);
  const { setCursorType } = useContext(cursorTypeContext);

  useKeydown((key) => {
    const index = +key - 1;
    if (!isNaN(index) && index < iconList.length) {
      setDrawType(iconList[index].type);
    }
  });

  useEffect(() => {
    setCursorType(
      drawType === "selection" ? CURSOR_CONFIG.default : CURSOR_CONFIG.crosshair
    );
  }, [drawType]);

  return (
    <div className={style["container"]}>
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
  );
};

export default Tool;
