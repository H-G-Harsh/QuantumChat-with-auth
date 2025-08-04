import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./lib/UserContext";

import Homepage from "./routes/homepage/Homepage.jsx";
import Dashboard from "./routes/dashboard/dashboard.jsx";
import Chat from "./routes/chatpage/chat.jsx";
import RootLayout from "./layouts/rootlayout/rootlayout.jsx";
import Dashboardlayout from "./layouts/dashboardlayout/dashboardlayout.jsx";
import Signin from './routes/signinpage/signin';
import Signup from './routes/signuppage/signup';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/sign-in/*", element: <Signin /> },
      { path: "/sign-up/*", element: <Signup /> },
      {
        element: <Dashboardlayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/dashboard/chat/:id", element: <Chat /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
