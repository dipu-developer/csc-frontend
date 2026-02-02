import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

export default function Nav() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("U");
	const avatarRef = React.useRef(null);

	React.useEffect(() => {
		function updateAuthState() {
			const authUser = localStorage.getItem("authUser");
			if (authUser) {
				try {
					const user = JSON.parse(authUser);
					setIsLoggedIn(true);
					if (user && user.first_name) {
						setUserName(user.first_name.charAt(0).toUpperCase());
					}
				} catch (e) {
					setIsLoggedIn(false);
				}
			} else {
				setIsLoggedIn(false);
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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left Side - Logo */}
					<Link to="/" className="flex items-center space-x-2">
						<div className="text-2xl font-bold">🎯</div>
						<span className="text-xl font-bold">CSC Solutions</span>
					</Link>

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
								className="relative flex items-center space-x-4"
								ref={avatarRef}
							>
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
