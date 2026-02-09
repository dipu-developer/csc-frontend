import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoPopup from "../../Components/PopUp/InfoPopup";

export default function Wallet() {
	const [wallet, setWallet] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [topUpAmount, setTopUpAmount] = useState("");
	const [isSdkLoaded, setIsSdkLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [infoPopupState, setInfoPopupState] = useState({
		isOpen: false,
		title: "",
		description: "",
		onClose: null,
	});

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
			setInfoPopupState({
				isOpen: true,
				title: "Please Wait",
				description: "Razorpay SDK is loading. Please wait...",
			});
			return;
		}
		if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
			setInfoPopupState({
				isOpen: true,
				title: "Invalid Amount",
				description: "Please enter a valid amount",
			});
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
						setInfoPopupState({
							isOpen: true,
							title: "Success",
							description: "Payment Successful! Wallet updated.",
						});
						setTopUpAmount("");
						fetchWalletData();
						window.dispatchEvent(new Event("walletUpdated"));
					} catch (verifyErr) {
						console.error(verifyErr);
						setInfoPopupState({
							isOpen: true,
							title: "Verification Failed",
							description:
								"Payment verification failed, but if money was deducted it will be refunded or credited shortly.",
						});
						fetchWalletData();
						window.dispatchEvent(new Event("walletUpdated"));
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
			setInfoPopupState({
				isOpen: true,
				title: "Error",
				description:
					err.response?.data?.message || "Failed to initiate top-up",
			});
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const getTransactionIcon = (type) => {
		switch (type?.toLowerCase()) {
			case "credit":
			case "topup":
				return (
					<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</div>
				);
			case "debit":
			case "payment":
				return (
					<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M20 12H4"
							/>
						</svg>
					</div>
				);
			default:
				return (
					<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					</div>
				);
		}
	};

	if (loading) {
		return (
			<div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-6 sm:py-12 px-4">
			<div className="max-w-4xl mx-auto">
				{/* Page Header */}
				<div className="mb-6 sm:mb-8">
					<h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
						Wallet
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Manage your balance and transactions
					</p>
				</div>

				{/* Balance Card */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 sm:p-8">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-blue-100 text-sm mb-1 sm:mb-2">
									Available Balance
								</p>
								<p className="text-white text-2xl sm:text-3xl font-semibold">
									{wallet?.currency}{" "}
									{wallet?.balance || "0.00"}
								</p>
							</div>
							<div>
								{wallet?.is_active ? (
									<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-400 text-white">
										Active
									</span>
								) : (
									<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-400 text-white">
										Inactive
									</span>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Add Money Card */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-5">
								Add Money
							</h2>
							<form onSubmit={handleTopUp} className="space-y-4">
								<div>
									<label
										htmlFor="amount"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Amount
									</label>
									<div className="relative">
										<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
											{wallet?.currency || "INR"}
										</span>
										<input
											type="number"
											name="amount"
											id="amount"
											className="w-full pl-16 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
											placeholder="0.00"
											value={topUpAmount}
											onChange={(e) =>
												setTopUpAmount(e.target.value)
											}
											min="1"
											step="0.01"
										/>
									</div>
								</div>
								<button
									type="submit"
									disabled={!isSdkLoaded}
									className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isSdkLoaded
										? "Proceed to Pay"
										: "Loading..."}
								</button>
							</form>
						</div>
					</div>

					{/* Recent Transactions */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-5">
								Recent Transactions
							</h2>

							{transactions && transactions.length > 0 ? (
								<div className="space-y-4">
									{transactions
										.slice(0, 5)
										.map((transaction, index) => (
											<div
												key={index}
												className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
											>
												<div className="flex items-center gap-4">
													{getTransactionIcon(
														transaction.transaction_type,
													)}
													<div>
														<p className="text-sm font-medium text-gray-900">
															{transaction.description ||
																transaction.transaction_type}
														</p>
														<p className="text-xs text-gray-500 mt-0.5">
															{formatDate(
																transaction.created_at,
															)}
														</p>
													</div>
												</div>
												<div className="text-right">
													<p
														className={`text-sm font-semibold ${
															transaction.transaction_type?.toLowerCase() ===
																"credit" ||
															transaction.transaction_type?.toLowerCase() ===
																"topup"
																? "text-green-600"
																: "text-red-600"
														}`}
													>
														{transaction.transaction_type?.toLowerCase() ===
															"credit" ||
														transaction.transaction_type?.toLowerCase() ===
															"topup"
															? "+"
															: "-"}
														{wallet?.currency}{" "}
														{Math.abs(
															transaction.amount,
														)}
													</p>
													<p className="text-xs text-gray-500 mt-0.5 capitalize">
														{transaction.status}
													</p>
												</div>
											</div>
										))}
								</div>
							) : (
								<div className="text-center py-12">
									<svg
										className="w-16 h-16 text-gray-300 mx-auto mb-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="1.5"
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
									<p className="text-gray-500 text-sm">
										No transactions yet
									</p>
									<p className="text-gray-400 text-xs mt-1">
										Your transaction history will appear
										here
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<InfoPopup
				isOpen={infoPopupState.isOpen}
				onClose={() => {
					setInfoPopupState((prev) => ({ ...prev, isOpen: false }));
					if (infoPopupState.onClose) infoPopupState.onClose();
				}}
				title={infoPopupState.title}
				description={infoPopupState.description}
			/>
		</div>
	);
}
