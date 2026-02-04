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
		return <div>Loading profile...</div>;
	}

	return (
		<div className="min-h-screen w-full  flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
				<p>
					<strong>First Name:</strong> {profileData.first_name}
				</p>
				<p>
					<strong>Last Name:</strong> {profileData.last_name}
				</p>
				<p>
					<strong>Phone Number:</strong> {profileData.phone_number}
				</p>
				<p>
					<strong>Role:</strong> {profileData.role_display}
				</p>
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
					onClick={handleResetPassword}
				>
					{showPasswordReset ? "Cancel" : "Reset Password"}
				</button>
				<button
					className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ml-4"
					onClick={handleLogout}
				>
					Logout
				</button>

				{showPasswordReset && (
					<form
						onSubmit={submitPasswordReset}
						className="mt-6 border-t pt-4"
					>
						<h3 className="text-lg font-bold mb-4">
							Change Password
						</h3>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Old Password
							</label>
							<input
								type="password"
								name="old_password"
								value={passwordData.old_password}
								onChange={handlePasswordChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								New Password
							</label>
							<input
								type="password"
								name="new_password"
								value={passwordData.new_password}
								onChange={handlePasswordChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Confirm New Password
							</label>
							<input
								type="password"
								name="new_password_confirm"
								value={passwordData.new_password_confirm}
								onChange={handlePasswordChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<button
							type="submit"
							className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
						>
							Update Password
						</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default Profile;
