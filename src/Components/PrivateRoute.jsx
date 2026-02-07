import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
	const authUser = localStorage.getItem("authUser");
	if (!authUser) return <Navigate to="/login" replace />;
	const location = useLocation();

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	};

	const token = getCookie("authToken");
	if (!token)
		return <Navigate to="/login" state={{ from: location }} replace />;
	return children;
}
