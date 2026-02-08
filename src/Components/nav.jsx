import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import axios from "axios";

export default function Nav({ toggleSidebar, isSidebarOpen }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("U");
	const [walletBalance, setWalletBalance] = useState(null);
	const [currency, setCurrency] = useState("INR");
	const avatarRef = React.useRef(null);

	React.useEffect(() => {
		const getCookie = (name) => {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(";").shift();
			return null;
		};

		const fetchWalletBalance = async () => {
			try {
				const token = getCookie("authToken");
				if (!token) return;
				const backendUrl = import.meta.env.VITE_BACKEND_URL;
				const response = await axios.get(
					`${backendUrl}/api/payments/wallet/balance/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				if (response.data && response.data.data) {
					setWalletBalance(response.data.data.balance);
					setCurrency(response.data.data.currency);
				}
			} catch (err) {
				console.error("Error fetching wallet balance:", err);
			}
		};

		function updateAuthState() {
			const authUser = localStorage.getItem("authUser");
			if (authUser) {
				try {
					const user = JSON.parse(authUser);
					setIsLoggedIn(true);
					if (user && user.first_name) {
						setUserName(user.first_name.charAt(0).toUpperCase());
					}
					fetchWalletBalance();
				} catch (e) {
					setIsLoggedIn(false);
					setWalletBalance(null);
				}
			} else {
				setIsLoggedIn(false);
				setWalletBalance(null);
			}
		}

		const onStorage = (e) => {
			if (e.key === "authUser") updateAuthState();
		};

		window.addEventListener("storage", onStorage);
		window.addEventListener("authChanged", updateAuthState);
		window.addEventListener("walletUpdated", fetchWalletBalance);
		// initialize
		updateAuthState();

		return () => {
			window.removeEventListener("storage", onStorage);
			window.removeEventListener("authChanged", updateAuthState);
			window.removeEventListener("walletUpdated", fetchWalletBalance);
		};
	}, []);

	return (
		<nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
			<div className="w-full px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left Side - Logo & Hamburger */}
					<div className="flex items-center gap-2 sm:gap-4">
						{isLoggedIn && (
							<button
								onClick={toggleSidebar}
								className="text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
								aria-label="Toggle sidebar"
							>
								{isSidebarOpen ? (
									// X icon when sidebar is open
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								) : (
									// Hamburger icon when sidebar is closed
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
						)}
						<Link to="/" className="flex items-center gap-2">
							<div className="text-xl sm:text-2xl">🎯</div>
							<span className="text-base sm:text-lg font-semibold text-gray-900">
								CSC Solutions
							</span>
						</Link>
					</div>

					{/* Right Side - Links or User Avatar */}
					<div className="flex items-center gap-3 sm:gap-6">
						{!isLoggedIn ? (
							<>
								<Link
									to="/login"
									className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
								>
									Login
								</Link>
								<Link
									to="/signup"
									className="text-sm font-medium bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors"
								>
									Sign Up
								</Link>
							</>
						) : (
							<div
								className="relative flex items-center gap-4"
								ref={avatarRef}
							>
								<Link to="/wallet">
									{walletBalance !== null && (
										<div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
											<svg
												className="w-4 h-4 text-gray-600"
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
											<span className="text-sm font-medium text-gray-900">
												{currency} {walletBalance}
											</span>
										</div>
									)}
								</Link>
								<Link
									to="/profile"
									className="w-9 h-9 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm hover:shadow-md transition-shadow"
								>
									{userName.charAt(0).toUpperCase()}
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
