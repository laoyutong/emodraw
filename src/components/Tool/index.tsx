import { useState } from "react";
import { iconList, iconProps } from "./config";
import ToolItem from "./ToolItem";
import { useKeydown } from "@/hooks";
import style from "./style.module.less";

const Tool = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  useKeydown((key) => {
    const index = +key;
    if (!isNaN(index) && index < iconList.length) {
      setActiveIndex(index);
    }
  });

  return (
    <div className={style["container"]}>
      {iconList.map((Icon, index) => (
        <ToolItem
          isActive={index === activeIndex}
          key={index}
          Icon={<Icon {...iconProps} />}
          index={index}
          changeIndex={setActiveIndex}
        />
      ))}
    </div>
  );
};

export default Tool;
