import { useEffect } from "react";

const useKeydown = (callback: (key: string) => void) => {
  useEffect(() => {
    const keyDownFn = (e: KeyboardEvent) => {
      callback(e.key);
    };
    document.addEventListener("keydown", keyDownFn);
    return () => document.removeEventListener("keydown", keyDownFn);
  }, []);
};

export default useKeydown;
