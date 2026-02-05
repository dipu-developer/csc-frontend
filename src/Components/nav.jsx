import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import axios from "axios";

export default function Nav({ toggleSidebar }) {
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
		// initialize
		updateAuthState();

		return () => {
			window.removeEventListener("storage", onStorage);
			window.removeEventListener("authChanged", updateAuthState);
		};
	}, []);

	return (
		<nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
			<div className="w-full px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left Side - Logo & Hamburger */}
					<div className="flex items-center">
						{isLoggedIn && (
							<button
								onClick={toggleSidebar}
								className="mr-4 text-white hover:text-blue-200 focus:outline-none"
							>
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
							</button>
						)}
						<Link to="/" className="flex items-center space-x-2">
							<div className="text-2xl font-bold">🎯</div>
							<span className="text-xl font-bold">
								CSC Solutions
							</span>
						</Link>
					</div>

					{/* Right Side - Links or User Avatar */}
					<div className="flex items-center space-x-6">
						{!isLoggedIn ? (
							<>
								<Link
									to="/login"
									className="hover:text-blue-200 transition duration-200 font-semibold"
								>
									Login
								</Link>
								<Link
									to="/signup"
									className="hover:text-blue-200 transition duration-200 font-semibold"
								>
									Signup
								</Link>
							</>
						) : (
							<div
								className="relative flex items-center space-x-4 justify-between gap-1"
								ref={avatarRef}
							>
								{walletBalance !== null && (
									<span className="text-white font-medium">
										{currency} {walletBalance}
									</span>
								)}
								<Link
									to="/profile"
									className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-blue-100 transition duration-200"
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
