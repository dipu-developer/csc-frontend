import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setError("");
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/`,
				{
					email: formData.email,
					password: formData.password,
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
			console.log("Login successful for:", data.data.user.email);
			navigate("/");
		} catch (error) {
			console.error("Login error:", error);
			if (error.response) {
				setError(error.response.data.message || "Login failed");
			} else {
				setError("An error occurred. Please try again.");
			}
		}
	};

	return (
		<div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-semibold text-gray-900 mb-2">
						Welcome back
					</h1>
					<p className="text-gray-600 text-sm">
						Sign in to continue to your account
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
					<form onSubmit={handleLogin} className="space-y-5">
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
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 pr-11"
									placeholder="Enter your password"
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
									aria-label={
										showPassword
											? "Hide password"
											: "Show password"
									}
								>
									{showPassword ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
								{error}
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
						>
							Log in
						</button>
					</form>
				</div>

				<p className="text-center mt-6 text-sm text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
