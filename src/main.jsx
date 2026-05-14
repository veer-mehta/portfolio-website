import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react";

const config = {
  apiKey: "hbp_ZbUQXll6DNjQ6hYz2gtXWGzy4Qcw2M18oII6",
  environment: "production",
};

const honeybadger = Honeybadger.configure(config);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HoneybadgerErrorBoundary honeybadger={honeybadger}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HoneybadgerErrorBoundary>
  </StrictMode>
);
