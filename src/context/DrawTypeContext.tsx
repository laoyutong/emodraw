import { createContext, ReactNode, useState } from "react";
import type { DrawType } from "@/type";

interface DrawTypeContextProps {
  children: ReactNode;
}

interface DrawTypeContextValue {
  drawType: DrawType;
  setDrawType: (type: DrawType) => void;
}

export const drawTypeContext = createContext<DrawTypeContextValue>(
  {} as DrawTypeContextValue
);

const DrawTypeContext = ({ children }: DrawTypeContextProps): JSX.Element => {
  const [drawType, setDrawType] = useState<DrawType>("selection");

  return (
    <drawTypeContext.Provider value={{ drawType, setDrawType }}>
      {children}
    </drawTypeContext.Provider>
  );
};

export default DrawTypeContext;
