import { useEffect, useRef } from "react";
import Tool from "@/components/Tool";
import { useResizeCanvas, useHandleDraw } from "@/hooks";

function App(): JSX.Element {
  const canvasIns = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasIns.current) {
      canvasCtx.current = canvasIns.current.getContext("2d");
    }
  }, []);

  useResizeCanvas(canvasIns);
  useHandleDraw(canvasCtx);

  return (
    <div className="App" style={{ position: "relative" }}>
      <Tool />
      <canvas ref={canvasIns} id="canvas" />
    </div>
  );
}

export default App;
