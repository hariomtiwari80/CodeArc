import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ClerkProvider } from "@clerk/clerk-react";

import { HandleProvider } from "./context/HandleContext";

import App from "./App";
import ScrollToTop from "./components/ScrollToTop";

import "./index.css";

const clerkPubKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ClerkProvider publishableKey={clerkPubKey}>

      <HandleProvider>

        <BrowserRouter>

          <ScrollToTop />

          <App />

        </BrowserRouter>

      </HandleProvider>

    </ClerkProvider>

  </React.StrictMode>
);