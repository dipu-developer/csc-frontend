import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
		referralCode: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/register/`,
				{
					first_name: formData.firstName,
					last_name: formData.lastName,
					email: formData.email,
					phone_number: formData.phoneNumber,
					password: formData.password,
					password_confirm: formData.confirmPassword,
					referral_code: formData.referralCode,
				},
			);

			const data = response.data;

			localStorage.setItem("authUser", JSON.stringify(data.data.user));
			localStorage.setItem("authToken", data.data.tokens.access);
			localStorage.setItem("refreshToken", data.data.tokens.refresh);
			window.dispatchEvent(new Event("authChanged"));
			console.log("Signup successful:", data);
			navigate("/");
		} catch (error) {
			console.error("Signup error:", error);
			if (error.response) {
				const data = error.response.data;
				console.error("Signup failed:", data);
				let errorMessage = data.message || "Signup failed";
				if (data.errors) {
					const errorDetails = Object.entries(data.errors)
						.map(([field, msgs]) => `${field}: ${msgs}`)
						.join("\n");
					errorMessage += `\n${errorDetails}`;
				}
				alert(errorMessage);
			} else {
				alert("An error occurred. Please try again.");
			}
		}
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

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Referral Code
						</label>
						<input
							type="text"
							name="referralCode"
							value={formData.referralCode}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Referral Code"
							required
						/>
					</div>

					<div className="mb-4">
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

					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Confirm Password"
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
						<Link
							to="/login"
							className="text-blue-500 font-bold hover:text-blue-700 underline cursor-pointer"
						>
							Login here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
