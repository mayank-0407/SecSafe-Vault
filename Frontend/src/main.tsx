import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PasswordVaultProvider } from "./Utils/context/PasswordVaultContext.tsx";
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PasswordVaultProvider>
      <Analytics />
      <App />
    </PasswordVaultProvider>
  </StrictMode>
);
