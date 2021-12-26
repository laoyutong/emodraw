import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DrawTypeContext, CursorTypeContext } from "@/context";

ReactDOM.render(
  <React.StrictMode>
    <DrawTypeContext>
      <CursorTypeContext>
        <App />
      </CursorTypeContext>
    </DrawTypeContext>
  </React.StrictMode>,
  document.getElementById("root")
);
