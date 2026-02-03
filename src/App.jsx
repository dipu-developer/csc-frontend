import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./Components/nav.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Profile from "./Pages/Profile.jsx";
import Product from "./Pages/Product.jsx";
import SideBar from "./Components/SideBar.jsx";

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuth = () => {
			const authUser = localStorage.getItem("authUser");
			setIsLoggedIn(!!authUser);
			if (!authUser) setIsSidebarOpen(false);
		};

		window.addEventListener("storage", checkAuth);
		window.addEventListener("authChanged", checkAuth);
		checkAuth();

		return () => {
			window.removeEventListener("storage", checkAuth);
			window.removeEventListener("authChanged", checkAuth);
		};
	}, []);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<>
			<Router>
				<Nav toggleSidebar={toggleSidebar} />
				<div className="flex items-start">
					{isLoggedIn && isSidebarOpen && (
						<div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40 flex-shrink-0">
							<SideBar />
						</div>
					)}
					<div className="flex-grow min-w-0">
						<Routes>
							<Route
								path="/"
								element={
									<PrivateRoute>
										<Home />
									</PrivateRoute>
								}
							/>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route
								path="/profile"
								element={
									<PrivateRoute>
										<Profile />
									</PrivateRoute>
								}
							/>
							<Route
								path="/product/:id"
								element={
									<PrivateRoute>
										<Product />
									</PrivateRoute>
								}
							/>
						</Routes>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
