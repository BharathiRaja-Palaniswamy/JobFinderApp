import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "./contexts/ConfigContext";
import startMockServer from "./mocks/Mock";
// // Configuration to determine whether to use Mirage JS
 const useMock = process.env.REACT_APP_USE_MOCK === 'true';
if (useMock) {
  startMockServer();

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
reportWebVitals();
