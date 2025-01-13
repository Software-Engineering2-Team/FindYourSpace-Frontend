import React from "react";
import { Navigate } from "react-router-dom";
import LoginStore from "../api/LoginStore";

const AdminRoute = ({ children }) => {
  const userData = LoginStore.getState().userData;

  if (!userData || !userData.is_staff) {
    alert("Access denied: Admins only.");
    return <Navigate to="/spaces" />;
  }

  return children;
};

export default AdminRoute;
