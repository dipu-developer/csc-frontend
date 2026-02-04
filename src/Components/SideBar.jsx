import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SideBar() {
	const navigate = useNavigate();

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	};

	const handleLogout = async () => {
		try {
			const accessToken = getCookie("authToken");
			const refreshToken = getCookie("refreshToken");
			if (accessToken && refreshToken) {
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout/`,
					{ refresh_token: refreshToken },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);
			}
		} finally {
			document.cookie =
				"authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			document.cookie =
				"refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			localStorage.removeItem("authUser");
			window.dispatchEvent(new Event("authChanged"));
			navigate("/login");
		}
	};

	return (
		<div className="w-64 bg-white h-full shadow-lg flex flex-col border-r border-gray-200">
			<div className="flex-1 py-6 flex flex-col space-y-2">
				<Link
					to="/assets"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Assets
				</Link>
				<Link
					to="/transactions"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Transactions
				</Link>
				<Link
					to="/wallet"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Wallet
				</Link>
				<Link
					to="/profile"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Account
				</Link>
			</div>
			<div className="p-4 border-t border-gray-200">
				<button
					onClick={handleLogout}
					className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors duration-200"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
