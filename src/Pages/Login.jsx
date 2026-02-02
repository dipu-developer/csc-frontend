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
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
								placeholder="Password"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
							>
								{showPassword ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
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
										strokeWidth={1.5}
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
						{error && (
							<p className="text-red-500 text-sm mt-1">{error}</p>
						)}
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
					<Link
						to="/signup"
						className="text-blue-500 font-bold hover:text-blue-700 underline cursor-pointer"
					>
						Signup here
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
