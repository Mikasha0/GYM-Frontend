import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Admin/Login";
import AdminPanel from "./Admin/AdminPanel";

export const Container = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/adminPanel",
      element: <AdminPanel />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

