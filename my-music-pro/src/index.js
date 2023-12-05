import React from "react";
import ReactDOM from "react-dom/client";
import { IndexStyles } from "./index.styles.js";
import { ShowEmulationApp } from "./components/EmulationApp/EmulationApp.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <IndexStyles />
    <React.StrictMode>
      <ShowEmulationApp />
    </React.StrictMode>
  </>
);
