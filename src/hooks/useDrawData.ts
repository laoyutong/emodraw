import { useEffect, useRef, RefObject } from "react";
import { LOCAL_STORAGE_KEY } from "@/config";
import type { DrawData } from "@/type";

interface DrawDataAction {
  addDrawData: (item: DrawData) => void;
  revokeDrawData: () => void;
  storageDrawData: () => void;
}

const useDrawData = (): [RefObject<DrawData[]>, DrawDataAction] => {
  const drawData = useRef<DrawData[]>([]);

  const storageDrawData = () =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drawData.current));

  useEffect(() => {
    let storageData;
    try {
      storageData =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string) || [];
    } catch (_) {
      storageData = [];
      localStorage.setItem(LOCAL_STORAGE_KEY, "[]");
    }
    drawData.current = storageData as DrawData[];
  }, []);

  const addDrawData = (item: DrawData) => {
    drawData.current.push(item);
  };

  const revokeDrawData = () => {
    drawData.current.pop();
  };

  return [drawData, { addDrawData, revokeDrawData, storageDrawData }];
};
export default useDrawData;
