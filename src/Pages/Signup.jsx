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
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setError("");
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
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

			const accessDate = new Date();
			accessDate.setTime(
				accessDate.getTime() +
					data.data.ACCESS_TOKEN_LIFETIME * 24 * 60 * 60 * 1000,
			);
			document.cookie = `authToken=${data.data.tokens.access}; expires=${accessDate.toUTCString()}; path=/`;

			const refreshDate = new Date();
			refreshDate.setTime(
				refreshDate.getTime() +
					data.data.REFRESH_TOKEN_LIFETIME * 24 * 60 * 60 * 1000,
			);
			document.cookie = `refreshToken=${data.data.tokens.refresh}; expires=${refreshDate.toUTCString()}; path=/`;

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
						.map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
						.join("\n");
					errorMessage += `\n${errorDetails}`;
				}
				setError(errorMessage);
			} else {
				setError("An error occurred. Please try again.");
			}
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-8">
			<div className="w-full max-w-lg">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-semibold text-gray-900 mb-2">
						Create your account
					</h1>
					<p className="text-gray-600 text-sm">
						Get started with your free account
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
					<form onSubmit={handleSignup} className="space-y-5">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									First name
								</label>
								<input
									id="firstName"
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
									placeholder="John"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Last name
								</label>
								<input
									id="lastName"
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
									placeholder="Doe"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
								placeholder="you@example.com"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Phone number
							</label>
							<input
								id="phoneNumber"
								type="tel"
								maxLength="12"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
								placeholder="+1234567890"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="referralCode"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Referral code
							</label>
							<input
								id="referralCode"
								type="text"
								name="referralCode"
								value={formData.referralCode}
								onChange={handleChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
								placeholder="Enter code"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
								placeholder="Create a strong password"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Confirm password
							</label>
							<input
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
								placeholder="Re-enter your password"
								required
							/>
						</div>

						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm whitespace-pre-line">
								{error}
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
						>
							Create account
						</button>
					</form>
				</div>

				<p className="text-center mt-6 text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Signup;
