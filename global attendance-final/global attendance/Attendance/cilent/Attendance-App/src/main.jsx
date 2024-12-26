import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Find your root element
const rootElement = document.getElementById("root");

// Use createRoot instead of render
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
