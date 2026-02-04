import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Wallet() {
	const [wallet, setWallet] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [topUpAmount, setTopUpAmount] = useState("");
	const [isSdkLoaded, setIsSdkLoaded] = useState(false);
	const [error, setError] = useState(null);

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	};

	useEffect(() => {
		const loadRazorpayScript = () => {
			if (window.Razorpay) {
				setIsSdkLoaded(true);
				return;
			}
			const scriptSrc = "https://checkout.razorpay.com/v1/checkout.js";
			let script = document.querySelector(`script[src="${scriptSrc}"]`);
			if (!script) {
				script = document.createElement("script");
				script.src = scriptSrc;
				script.async = true;
				document.body.appendChild(script);
			}
			script.addEventListener("load", () => setIsSdkLoaded(true));
		};
		loadRazorpayScript();
		fetchWalletData();
	}, []);

	const fetchWalletData = async () => {
		try {
			setLoading(true);
			const token = getCookie("authToken");
			const backendUrl = import.meta.env.VITE_BACKEND_URL;

			const [balanceRes, transactionsRes] = await Promise.all([
				axios.get(`${backendUrl}/api/payments/wallet/balance/`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				axios.get(`${backendUrl}/api/payments/transactions/`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);

			setWallet(balanceRes.data.data);
			setTransactions(transactionsRes.data.data.transactions);
		} catch (err) {
			console.error("Error fetching wallet data:", err);
			setError("Failed to load wallet information.");
		} finally {
			setLoading(false);
		}
	};

	const handleTopUp = async (e) => {
		e.preventDefault();
		if (!isSdkLoaded) {
			alert("Razorpay SDK is loading. Please wait...");
			return;
		}
		if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
			alert("Please enter a valid amount");
			return;
		}

		try {
			const token = getCookie("authToken");
			const backendUrl = import.meta.env.VITE_BACKEND_URL;

			// Create Top-up Order
			const response = await axios.post(
				`${backendUrl}/api/payments/wallet/topup/`,
				{ amount: topUpAmount },
				{ headers: { Authorization: `Bearer ${token}` } },
			);

			const { order_id, amount, currency, razorpay_key } =
				response.data.data;

			const options = {
				key: razorpay_key || import.meta.env.VITE_RAZORPAY_KEY,
				amount: Math.round(amount * 100),
				currency: currency,
				name: "CSC Solutions",
				description: "Wallet Top-up",
				order_id: order_id,
				handler: async (response) => {
					try {
						await axios.post(
							`${backendUrl}/api/payments/verify/`,
							{
								razorpay_order_id: response.razorpay_order_id,
								razorpay_payment_id:
									response.razorpay_payment_id,
								razorpay_signature: response.razorpay_signature,
							},
							{ headers: { Authorization: `Bearer ${token}` } },
						);
						alert("Payment Successful! Wallet updated.");
						setTopUpAmount("");
						fetchWalletData();
					} catch (verifyErr) {
						console.error(verifyErr);
						alert(
							"Payment verification failed, but if money was deducted it will be refunded or credited shortly.",
						);
						fetchWalletData();
					}
				},
				theme: {
					color: "#2563EB",
				},
			};

			const rzp1 = new window.Razorpay(options);
			rzp1.open();
		} catch (err) {
			console.error("Top-up error:", err);
			alert(err.response?.data?.message || "Failed to initiate top-up");
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="animate-pulse text-xl font-semibold text-gray-600">
					Loading Wallet...
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					My Wallet
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column: Balance & Top-up */}
					<div className="lg:col-span-1 space-y-6">
						{/* Balance Card */}
						<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
							<h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
								Available Balance
							</h2>
							<div className="mt-4 flex items-baseline">
								<span className="text-4xl font-extrabold text-gray-900">
									{wallet?.currency} {wallet?.balance}
								</span>
							</div>
							<div className="mt-2 text-sm text-gray-500">
								{wallet?.is_active ? (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										Active
									</span>
								) : (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
										Inactive
									</span>
								)}
							</div>
						</div>

						{/* Top-up Form */}
						<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Add Money
							</h3>
							<form onSubmit={handleTopUp}>
								<div className="mb-4">
									<label
										htmlFor="amount"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Amount
									</label>
									<div className="relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<span className="text-gray-500 sm:text-sm">
												{wallet?.currency || "INR"}
											</span>
										</div>
										<input
											type="number"
											name="amount"
											id="amount"
											className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md py-3 border"
											placeholder="0.00"
											value={topUpAmount}
											onChange={(e) =>
												setTopUpAmount(e.target.value)
											}
											min="1"
										/>
									</div>
								</div>
								<button
									type="submit"
									disabled={!isSdkLoaded}
									className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
								>
									Proceed to Pay
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
