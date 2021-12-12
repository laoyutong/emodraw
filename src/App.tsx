import { useRef } from "react";
import Tool from "./components/Tool";
import { useResizeCanvas } from "./hooks";
import { DrawTypeContext } from "@/context";

function App(): JSX.Element {
  const canvasIns = useRef<HTMLCanvasElement>(null);

  useResizeCanvas(canvasIns);

  return (
    <DrawTypeContext>
      <div className="App" style={{ position: "relative" }}>
        <Tool />
        <canvas ref={canvasIns} id="canvas" />
      </div>
    </DrawTypeContext>
  );
}

export default App;
