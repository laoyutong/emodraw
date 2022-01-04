import { useContext } from "react";
import { iconList, iconProps } from "./config";
import ToolItem from "./ToolItem";
import { useKeydown } from "@/hooks";
import { drawTypeContext } from "@/context";
import style from "./style.module.less";

const Tool = (): JSX.Element => {
  const { drawType, setDrawType } = useContext(drawTypeContext);

  useKeydown((key) => {
    const index = +key - 1;
    if (!isNaN(index) && index !== -1 && index < iconList.length) {
      setDrawType(iconList[index].type);
    }
  });

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
