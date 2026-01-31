import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export default function Nav() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("U");
	const [menuOpen, setMenuOpen] = useState(false);
	const avatarRef = React.useRef(null);
	const [dropdownPos, setDropdownPos] = useState(null);

	React.useEffect(() => {
		function updateAuthState() {
			const email = localStorage.getItem("authUser");
			if (email) {
				setIsLoggedIn(true);
				const usersJson = localStorage.getItem("users") || "[]";
				const users = JSON.parse(usersJson);
				const me = users.find((u) => u.email === email);
				if (me && me.firstName)
					setUserName(me.firstName.charAt(0).toUpperCase());
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

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("authUser");
		localStorage.removeItem("authToken");
		setIsLoggedIn(false);
		setMenuOpen(false);
		navigate("/login");
	};

	// close menu when clicking outside
	React.useEffect(() => {
		const onDocClick = (e) => {
			if (avatarRef.current && !avatarRef.current.contains(e.target)) {
				setMenuOpen(false);
			}
		};
		window.addEventListener("click", onDocClick);
		return () => window.removeEventListener("click", onDocClick);
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
								<div
									onClick={() => {
										const rect =
											avatarRef.current.getBoundingClientRect();
										setDropdownPos({
											top: rect.bottom + window.scrollY,
											left: rect.right - 144, // align right edge assuming dropdown width ~144px
										});
										setMenuOpen((s) => !s);
									}}
									className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-blue-100 transition duration-200"
								>
									{userName.charAt(0).toUpperCase()}
								</div>

								{menuOpen &&
									dropdownPos &&
									createPortal(
										<div
											style={{
												position: "absolute",
												top: dropdownPos.top + "px",
												left: dropdownPos.left + "px",
												zIndex: 9999,
											}}
											className="w-36 bg-white text-black rounded-md shadow-lg p-2"
										>
											<button
												onClick={handleLogout}
												className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
											>
												Logout
											</button>
										</div>,
										document.body,
									)}
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
