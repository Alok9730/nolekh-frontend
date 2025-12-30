import { createRoot } from "react-dom/client";
import "./index.css";
import { CustomerProvider } from "./ContextApi/CustomerlistContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <CustomerProvider>
    <App />
  </CustomerProvider>
);
