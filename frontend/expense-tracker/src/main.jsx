import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import RegistrationForm from "./components/RegistrationForm";
import React from "react";
import Home from "./components/Home.jsx";
import AddExpense from "./components/AddExpense.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import UpdateExpense from "./components/UpdateExpense.jsx";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/register" /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegistrationForm /> },
      { path: "/home", element: <Home /> },
      { path: "/add-expense", element: <AddExpense /> },
      { path: "/expense-list", element: <ExpenseList /> },
      { path: "/update-expense/:id", element: <UpdateExpense /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
