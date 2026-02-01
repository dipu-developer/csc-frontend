import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
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

	const handleSignup = (e) => {
		e.preventDefault();
		if (!recaptchaToken) {
			alert("Please verify the reCAPTCHA");
			return;
		}

		// Basic client-side signup: save users to localStorage
		const usersJson = localStorage.getItem("users") || "[]";
		const users = JSON.parse(usersJson);

		// Check if email already registered
		if (users.some((u) => u.email === formData.email)) {
			alert("An account with this email already exists. Please login.");
			return;
		}

		// Store user (password is lightly encoded with btoa for demo only)
		const newUser = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			password: btoa(formData.password),
		};

		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));

		// Set auth state (simple token) and redirect to home
		localStorage.setItem("authUser", formData.email);
		localStorage.setItem(
			"authToken",
			btoa(formData.email + ":" + Date.now()),
		);
		// notify other listeners (same-window) to update UI
		window.dispatchEvent(new Event("authChanged"));

		console.log("Signup Data:", newUser);
		navigate("/");
	};

	const handleLoginRedirect = () => {
		navigate("/login");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
				<form onSubmit={handleSignup}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="First name"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Last name"
							required
						/>
					</div>

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

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Phone Number
						</label>
						<input
							type="tel"
							maxLength="12"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Phone Number"
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

					<div className="flex gap-4">
						<button
							type="submit"
							className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
						>
							Signup
						</button>
					</div>
					<div className="text-center">
						<span className="text-gray-600">have an account? </span>
						<button
							onClick={handleLoginRedirect}
							className="text-blue-500 font-bold hover:text-blue-700 underline cursor-pointer"
						>
							Login here
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
