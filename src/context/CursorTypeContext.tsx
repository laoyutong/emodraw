import { createContext, ReactNode, useState } from "react";
import { CURSOR_CONFIG } from "@/config";

type CursorType = typeof CURSOR_CONFIG[keyof typeof CURSOR_CONFIG];

interface CursorContextProps {
  children: ReactNode;
}

interface CursorContextValue {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

export const cursorTypeContext = createContext<CursorContextValue>(
  {} as CursorContextValue
);

const CursorTypeContext = ({ children }: CursorContextProps): JSX.Element => {
  const [cursorType, setCursorType] = useState<CursorType>(
    CURSOR_CONFIG.default
  );

  return (
    <cursorTypeContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </cursorTypeContext.Provider>
  );
};

export default CursorTypeContext;
