import { useEffect } from "react";

const useKeydown = (callback: (key: string) => void) => {
  useEffect(() => {
    const keydownFn = (e: KeyboardEvent) => {
      callback(e.key);
    };
    document.addEventListener("keydown", keydownFn);
    return () => document.removeEventListener("keydown", keydownFn);
  }, []);
};

export default useKeydown;
