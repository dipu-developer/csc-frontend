import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
	const [profileData, setProfileData] = useState(null);
	const [showPasswordReset, setShowPasswordReset] = useState(false);
	const [passwordData, setPasswordData] = useState({
		old_password: "",
		new_password: "",
		new_password_confirm: "",
	});
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = getCookie("authToken");
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				setProfileData(response.data.data);
			} catch (error) {
				console.error("Error fetching profile:", error);
				if (error.response && error.response.status !== 200) {
					// Handle error appropriately (e.g., redirect to login)
					document.cookie =
						"authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					document.cookie =
						"refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					localStorage.removeItem("authUser");
					navigate("/login");
				}
			}
		};

		fetchProfile();
	}, [navigate]);

	const handleResetPassword = () => {
		if (showPasswordReset) {
			setPasswordData({
				old_password: "",
				new_password: "",
				new_password_confirm: "",
			});
		}
		setShowPasswordReset(!showPasswordReset);
	};

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const submitPasswordReset = async (e) => {
		e.preventDefault();
		if (passwordData.new_password !== passwordData.new_password_confirm) {
			alert("New passwords do not match");
			return;
		}

		try {
			const token = getCookie("authToken");
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/change-password/`,
				passwordData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			alert("Password changed successfully");
			setShowPasswordReset(false);
			setPasswordData({
				old_password: "",
				new_password: "",
				new_password_confirm: "",
			});
		} catch (error) {
			console.error("Error changing password:", error);
			if (error.response) {
				const data = error.response.data;
				console.error("Password change failed:", data);
				let errorMessage = data.message || "Failed to change password";
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

	const handleLogout = async () => {
		try {
			const accessToken = getCookie("authToken");
			const refreshToken = getCookie("refreshToken");
			if (accessToken && refreshToken) {
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout/`,
					{ refresh_token: refreshToken },
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);
			}
		} finally {
			document.cookie =
				"authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			document.cookie =
				"refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			localStorage.removeItem("authUser");
			window.dispatchEvent(new Event("authChanged"));
			navigate("/login");
		}
	};

	if (!profileData) {
		return (
			<div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				{/* Profile Card */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					{/* Header Section */}
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>

					{/* Profile Content */}
					<div className="px-8 pb-8">
						{/* Avatar */}
						<div className="-mt-16 mb-6">
							<div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
								<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
									{profileData.first_name?.charAt(0)}
									{profileData.last_name?.charAt(0)}
								</div>
							</div>
						</div>

						{/* Name and Role */}
						<div className="mb-6">
							<h1 className="text-2xl font-semibold text-gray-900 mb-2">
								{profileData.first_name} {profileData.last_name}
							</h1>
							<span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
								{profileData.role_display}
							</span>
						</div>

						{/* Contact Information */}
						<div className="space-y-3 mb-8 pb-8 border-b border-gray-200">
							<div className="flex items-center text-gray-600">
								<svg
									className="w-5 h-5 mr-3 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<span className="text-sm">
									{profileData.email}
								</span>
							</div>
							<div className="flex items-center text-gray-600">
								<svg
									className="w-5 h-5 mr-3 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								<span className="text-sm">
									{profileData.phone_number}
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3">
							<button
								onClick={handleResetPassword}
								className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
							>
								{showPasswordReset
									? "Cancel"
									: "Change Password"}
							</button>
							<button
								onClick={handleLogout}
								className="bg-white border border-red-300 text-red-600 py-2.5 px-6 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
							>
								Logout
							</button>
						</div>
					</div>
				</div>

				{/* Password Reset Form */}
				{showPasswordReset && (
					<div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							Change Password
						</h2>
						<form
							onSubmit={submitPasswordReset}
							className="space-y-5"
						>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Current Password
								</label>
								<div className="relative">
									<input
										type={
											showOldPassword
												? "text"
												: "password"
										}
										name="old_password"
										value={passwordData.old_password}
										onChange={handlePasswordChange}
										className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-11"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowOldPassword(!showOldPassword)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
									>
										{showOldPassword ? (
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
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									New Password
								</label>
								<div className="relative">
									<input
										type={
											showNewPassword
												? "text"
												: "password"
										}
										name="new_password"
										value={passwordData.new_password}
										onChange={handlePasswordChange}
										className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-11"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowNewPassword(!showNewPassword)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
									>
										{showNewPassword ? (
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
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Confirm New Password
								</label>
								<div className="relative">
									<input
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										name="new_password_confirm"
										value={
											passwordData.new_password_confirm
										}
										onChange={handlePasswordChange}
										className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-11"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword,
											)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
									>
										{showConfirmPassword ? (
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
							<div className="pt-4">
								<button
									type="submit"
									className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
								>
									Update Password
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
