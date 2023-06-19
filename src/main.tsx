import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MarkdownContextProvider } from "./contexts/markdownContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MarkdownContextProvider>
      <App />
    </MarkdownContextProvider>
  </React.StrictMode>
);
