import React from "react";
import ReactDOM from "react-dom/client";
import { IndexStyles } from "./index.styles.js";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <IndexStyles />
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>
  </>
);
