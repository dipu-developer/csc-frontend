import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import PrivateRoute from "./Components/PrivateRoute.jsx";
import SideBar from "./Components/SideBar.jsx";
import Nav from "./Components/nav.jsx";

// pages
import Login from "./Pages/Auth/Login.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Product from "./Pages/Product.jsx";
import Assets from "./Pages/Assets.jsx";
import Profile from "./Pages/Account/Profile.jsx";
import Wallet from "./Pages/Account/Wallet.jsx";
import Transactions from "./Pages/Account/Transactions.jsx";
import Services from "./Pages/Services/Services.jsx";
import CardNumberFind from "./Pages/Services/CardNumberFind.jsx";

// quick links
import PrivacyPolicy from "./Pages/Quick Links/PrivacyPolicy.jsx";
import TC from "./Pages/Quick Links/TC.jsx";
import AboutUs from "./Pages/Quick Links/AboutUs.jsx";

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuth = () => {
			const authUser = localStorage.getItem("authUser");
			setIsLoggedIn(!!authUser);
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
				<Nav
					toggleSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>
				<div className="flex items-start w-full min-w-[320px]">
					{isLoggedIn && (
						<>
							<div
								className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
									isSidebarOpen
										? "opacity-100"
										: "opacity-0 pointer-events-none"
								}`}
								onClick={() => setIsSidebarOpen(false)}
							/>
							<div
								className={`fixed top-16 bottom-0 left-0 z-40 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex shrink-0 transition-transform duration-300 ease-in-out ${
									isSidebarOpen
										? "translate-x-0"
										: "-translate-x-full lg:translate-x-0"
								}`}
							>
								<SideBar isOpen={isSidebarOpen} />
							</div>
						</>
					)}
					<div className="flex grow min-w-0 w-full">
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
								path="/assets"
								element={
									<PrivateRoute>
										<Assets />
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
							<Route
								path="/wallet"
								element={
									<PrivateRoute>
										<Wallet />
									</PrivateRoute>
								}
							/>
							<Route
								path="/transactions"
								element={
									<PrivateRoute>
										<Transactions />
									</PrivateRoute>
								}
							/>
							<Route
								path="/services"
								element={
									<PrivateRoute>
										<Services />
									</PrivateRoute>
								}
							/>
							<Route
								path="/services/cardnumberfind"
								element={
									<PrivateRoute>
										<CardNumberFind />
									</PrivateRoute>
								}
							/>
							<Route
								path="/privacy_policy"
								element={<PrivacyPolicy />}
							/>
							<Route path="/tc" element={<TC />} />
							<Route path="/about_us" element={<AboutUs />} />
						</Routes>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
