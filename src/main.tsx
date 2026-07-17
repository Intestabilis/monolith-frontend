import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Router from "./Router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "./components/ui/Tooltip.tsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        // CHANGE icons
        toastOptions={{
          duration: 4000,
          className: "font-mono text-sm tracking-wide",
          style: {
            borderRadius: "0px",
            border: "2px solid var(--color-border-strong)",
            background: "var(--color-surface)",
            padding: "12px 16px",
          },
          success: {
            style: {
              border: "2px solid var(--color-success)",
              background: "var(--color-success-surface)",
              color: "var(--color-text-primary)",
            },
            icon: <span className="text-xl">✓</span>,
          },

          error: {
            style: {
              border: "2px solid var(--color-danger)",
              background: "var(--color-danger-surface)",
              color: "var(--color-danger)",
            },
            icon: <span className="text-xl text-danger">X</span>,
            duration: 5000,
          },

          blank: {
            className: "!text-text-primary",
          },
        }}
      />
      <TooltipProvider delayDuration={300}>
        <div className="flex flex-col min-h-screen max-w-screen mx-auto bg-background text-text-primary selection:bg-primary-surface selection:text-text-selected">
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>,
);
