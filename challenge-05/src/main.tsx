import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AuthProvider>
  </React.StrictMode>
);
