import { useRef } from "react";
import Tool from "./components/Tool";
import { useResizeCanvas } from "./hooks";

function App(): JSX.Element {
  const canvasIns = useRef<HTMLCanvasElement>(null);

  useResizeCanvas(canvasIns);

  return (
    <div className="App" style={{ position: "relative" }}>
      <Tool />
      <canvas ref={canvasIns} id="canvas" />
    </div>
  );
}

export default App;
