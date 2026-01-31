import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
	const authUser = localStorage.getItem("authUser");
	if (!authUser) return <Navigate to="/login" replace />;
	return children;
}
