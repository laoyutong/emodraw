import { useContext, useEffect, useRef } from "react";
import Tool from "@/components/Tool";
import { useResizeCanvas, useHandleDraw } from "@/hooks";
import { cursorTypeContext } from "@/context";

function App(): JSX.Element {
  const canvasIns = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  const { cursorType } = useContext(cursorTypeContext);
  useEffect(() => {
    if (canvasIns.current) {
      canvasCtx.current = canvasIns.current.getContext("2d");
    }
  }, []);

  useHandleDraw(canvasCtx, canvasIns);
  useResizeCanvas(canvasIns, canvasCtx);

  return (
    <div className="App" style={{ position: "relative", cursor: cursorType }}>
      <Tool />
      <canvas ref={canvasIns} id="canvas" />
    </div>
  );
}

export default App;
