import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/system";
import theme from "./utils/theme";
import CatProvider from "./context/catContext";
import { NotificationProvider } from "./context/notificationCTx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, //24 hours
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
      retry: 1,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <CatProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </CatProvider>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
