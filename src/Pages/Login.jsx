import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleLogin = (e) => {
		e.preventDefault();

		// Basic client-side login: verify against users in localStorage
		const usersJson = localStorage.getItem("users") || "[]";
		const users = JSON.parse(usersJson);
		const found = users.find((u) => u.email === formData.email);
		if (!found) {
			alert("No account found with this email. Please signup.");
			return;
		}

		// Compare stored (btoa) password
		if (found.password !== btoa(formData.password)) {
			alert("Incorrect password. Please try again.");
			return;
		}

		// Success: set auth and redirect
		localStorage.setItem("authUser", found.email);
		localStorage.setItem("authToken", btoa(found.email + ":" + Date.now()));
		// notify other listeners (same-window) to update UI
		window.dispatchEvent(new Event("authChanged"));
		console.log("Login successful for:", found.email);
		navigate("/");
	};

	const handleSignupRedirect = () => {
		navigate("/signup");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email Address
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Email Address"
							required
						/>
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Password"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
					>
						Login
					</button>
				</form>

				<div className="text-center">
					<span className="text-gray-600">No account? </span>
					<button
						onClick={handleSignupRedirect}
						className="text-blue-500 font-bold hover:text-blue-700 underline cursor-pointer"
					>
						Signup here
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
