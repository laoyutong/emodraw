import { useEffect } from "react";

const useKeydown = (callback: (key: string, metaKey: boolean) => void) => {
  useEffect(() => {
    const keydownFn = (e: KeyboardEvent) => {
      const { key, metaKey } = e;
      callback(key, metaKey);
    };
    document.addEventListener("keydown", keydownFn);
    return () => document.removeEventListener("keydown", keydownFn);
  }, []);
};

export default useKeydown;
