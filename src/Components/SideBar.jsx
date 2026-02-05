import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function SideBar() {
	const navigate = useNavigate();
	const location = useLocation();

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

	const isActive = (path) => location.pathname === path;

	const navItems = [
		{
			path: "/assets",
			label: "Products",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
					/>
				</svg>
			),
		},
		{
			path: "/transactions",
			label: "Transactions",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					/>
				</svg>
			),
		},
		{
			path: "/wallet",
			label: "Wallet",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
					/>
				</svg>
			),
		},
		{
			path: "/profile",
			label: "Profile",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			),
		},
	];

	return (
		<div className="w-64 bg-white h-full shadow-sm flex flex-col border-r border-gray-200">
			{/* Navigation Items */}
			<div className="flex-1 py-6">
				<nav className="space-y-1 px-3">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
								isActive(item.path)
									? "bg-blue-50 text-blue-600"
									: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							}`}
						>
							{item.icon}
							<span>{item.label}</span>
						</Link>
					))}
				</nav>
			</div>

			{/* Logout Button */}
			<div className="p-4 border-t border-gray-200">
				<button
					onClick={handleLogout}
					className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
}
