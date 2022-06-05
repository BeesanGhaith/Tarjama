import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Import Provider
import { Provider } from "react-redux";
//Import Store
import store from "./reducer/index";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
