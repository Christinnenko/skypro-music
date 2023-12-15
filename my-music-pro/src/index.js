import React from "react";
import ReactDOM from "react-dom/client";
import { IndexStyles } from "./index.styles.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <IndexStyles />
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
);
