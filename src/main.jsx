import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback="...loading">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
