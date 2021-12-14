import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DrawTypeContext } from "@/context";

ReactDOM.render(
  <React.StrictMode>
    <DrawTypeContext>
      <App />
    </DrawTypeContext>
  </React.StrictMode>,
  document.getElementById("root")
);
