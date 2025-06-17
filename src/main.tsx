import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { AuthContextProvider } from "./context/AuthContextEnhanced";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthContextProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthContextProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
