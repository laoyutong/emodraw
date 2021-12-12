import { createContext, ReactNode, useState } from "react";
import type { DrawTypeContextValue } from "./type";

interface DrawTypeContextProps {
  children: ReactNode;
}

export const drawTypeContext = createContext<DrawTypeContextValue>(
  {} as DrawTypeContextValue
);

const DrawTypeContext = ({ children }: DrawTypeContextProps): JSX.Element => {
  const [drawType, setDrawType] =
    useState<DrawTypeContextValue["drawType"]>("selection");

  return (
    <drawTypeContext.Provider value={{ drawType, setDrawType }}>
      {children}
    </drawTypeContext.Provider>
  );
};

export default DrawTypeContext;
