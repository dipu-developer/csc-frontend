import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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

	const handleLogin = async (e) => {
		e.preventDefault();

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
				alert(error.response.data.message || "Login failed");
			} else {
				alert("An error occurred. Please try again.");
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
