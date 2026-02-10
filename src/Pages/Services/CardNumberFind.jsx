import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmPopup from "../../Components/PopUp/ConfirmPopup";
import InfoPopup from "../../Components/PopUp/InfoPopup";

export default function CardNumberFind() {
	const location = useLocation();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [infoPopup, setInfoPopup] = useState({
		isOpen: false,
		title: "",
		description: "",
		onClose: null,
	});
	const { price } = location.state || {};

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowConfirm(true);
	};

	const executeSearch = async () => {
		setLoading(true);
		setResult(null);
		try {
			const getCookie = (name) => {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) return parts.pop().split(";").shift();
				return null;
			};
			const token = getCookie("authToken");

			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/api/services/cardnumberfind/?name=${name}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			console.log(response.data.data);
			setResult(response.data.data.results[0]);
			window.dispatchEvent(new Event("walletUpdated"));
		} catch (error) {
			console.error("Error:", error);
			setInfoPopup({
				isOpen: true,
				title: "Error",
				description:
					error.response?.data?.message ||
					"An error occurred while fetching data.",
				onClose: () => navigate("/wallet"),
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-12 px-4">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 h-fit">
					<h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
						Card Number Finder
					</h1>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								placeholder="Enter name"
								required
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Searching..." : "Submit"}
						</button>
						<div className="text-sm text-gray-500 text-center">
							Note: {price || "10Rs"} will be deducted for each
							search.
						</div>
					</form>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 h-fit min-h-[300px]">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Results
					</h2>
					{result ? (
						<div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-[500px]">
							<pre className="text-sm text-gray-700 whitespace-pre-wrap">
								{JSON.stringify(result, null, 2)}
							</pre>
						</div>
					) : (
						<div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
							<svg
								className="w-12 h-12 mb-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<p>Enter a name to search</p>
						</div>
					)}
				</div>
			</div>
			<ConfirmPopup
				isOpen={showConfirm}
				onClose={() => setShowConfirm(false)}
				onConfirm={executeSearch}
				title="Confirm Search"
				description={`Are you sure you want to search for "${name}"?`}
				price={price}
				confirmText="Search"
			/>
			<InfoPopup
				isOpen={infoPopup.isOpen}
				onClose={() => {
					setInfoPopup({ ...infoPopup, isOpen: false });
					if (infoPopup.onClose) infoPopup.onClose();
				}}
				title={infoPopup.title}
				description={infoPopup.description}
			/>
		</div>
	);
}
