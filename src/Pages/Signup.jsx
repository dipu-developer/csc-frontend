import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
	});

	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const google_Recaptcha_site_key = import.meta.env
		.VITE_GOOGLE_RECAPTCHA_SITE_KEY;

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRecaptchaChange = (token) => {
		setRecaptchaToken(token);
		console.log("reCAPTCHA Token:", token);
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
		console.log("reCAPTCHA Token:", recaptchaToken);
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

					<div className="mb-6 flex justify-center">
						<ReCAPTCHA
							sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
							onChange={handleRecaptchaChange}
						/>
					</div>

					<div className="flex gap-4">
						<button
							type="submit"
							className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
						>
							Signup
						</button>
						<button
							type="button"
							onClick={handleLoginRedirect}
							className="flex-1 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
