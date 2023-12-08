import React from "react";
import ReactDOM from "react-dom/client";
import { IndexStyles } from "./index.styles.js";
import { ShowEmulationApp } from "./components/EmulationApp/EmulationApp.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <IndexStyles />
    <React.StrictMode>
      <BrowserRouter>
        <ShowEmulationApp />
      </BrowserRouter>
    </React.StrictMode>
  </>
);
