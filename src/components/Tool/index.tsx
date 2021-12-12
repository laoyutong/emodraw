import { useState } from "react";
import { iconList, iconProps } from "./config";
import ToolItem from "./ToolItem";

import style from "./style.module.less";

const Tool = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

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
