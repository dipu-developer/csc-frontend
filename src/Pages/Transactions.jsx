import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterType, setFilterType] = useState("all");
	const itemsPerPage = 10;

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const token = getCookie("authToken");
				const backendUrl = import.meta.env.VITE_BACKEND_URL;
				const response = await axios.get(
					`${backendUrl}/api/payments/transactions/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				setTransactions(response.data.data.transactions);
			} catch (err) {
				console.error("Error fetching transactions:", err);
				setError("Failed to load transaction history.");
			} finally {
				setLoading(false);
			}
		};

		fetchTransactions();
	}, []);

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
			<div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
				<div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
					<div className="flex items-center gap-3 text-red-600">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="text-sm font-medium">{error}</span>
					</div>
				</div>
			</div>
		);
	}

	// Filter transactions
	const filteredTransactions =
		filterType === "all"
			? transactions
			: transactions.filter(
					(t) => t.transaction_type?.toLowerCase() === filterType,
				);

	// Pagination Logic
	const indexOfLastTransaction = currentPage * itemsPerPage;
	const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
	const currentTransactions = filteredTransactions.slice(
		indexOfFirstTransaction,
		indexOfLastTransaction,
	);
	const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Generate page numbers with ellipsis
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push("...");
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - 3; i <= totalPages; i++)
					pages.push(i);
			} else {
				pages.push(1);
				pages.push("...");
				pages.push(currentPage - 1);
				pages.push(currentPage);
				pages.push(currentPage + 1);
				pages.push("...");
				pages.push(totalPages);
			}
		}
		return pages;
	};

	return (
		<div className="min-h-screen w-full bg-gray-50 py-12 px-4">
			<div className="max-w-5xl mx-auto">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-900">
						Transaction History
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						View all your wallet transactions
					</p>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
					<div className="flex items-center gap-3">
						<span className="text-sm font-medium text-gray-700">
							Filter:
						</span>
						<div className="flex gap-2">
							<button
								onClick={() => {
									setFilterType("all");
									setCurrentPage(1);
								}}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									filterType === "all"
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								All
							</button>
							<button
								onClick={() => {
									setFilterType("credit");
									setCurrentPage(1);
								}}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									filterType === "credit"
										? "bg-green-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								Credits
							</button>
							<button
								onClick={() => {
									setFilterType("debit");
									setCurrentPage(1);
								}}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									filterType === "debit"
										? "bg-red-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								Debits
							</button>
						</div>
					</div>
				</div>

				{/* Transactions List */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					{filteredTransactions.length === 0 ? (
						<div className="text-center py-16">
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
								No transactions found
							</p>
							<p className="text-gray-400 text-xs mt-1">
								Your transaction history will appear here
							</p>
						</div>
					) : (
						<>
							<div className="divide-y divide-gray-100">
								{currentTransactions.map(
									(transaction, index) => (
										<div
											key={transaction.id || index}
											className="p-5 hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-4 flex-1 min-w-0">
													{getTransactionIcon(
														transaction.transaction_type,
													)}
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium text-gray-900 truncate">
															{transaction.description ||
																transaction.transaction_type}
														</p>
														<div className="flex items-center gap-3 mt-1">
															<p className="text-xs text-gray-500">
																{formatDate(
																	transaction.created_at,
																)}
															</p>
															<span
																className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
																	transaction.status ===
																	"completed"
																		? "bg-green-100 text-green-700"
																		: transaction.status ===
																			  "pending"
																			? "bg-yellow-100 text-yellow-700"
																			: "bg-red-100 text-red-700"
																}`}
															>
																{
																	transaction.status
																}
															</span>
														</div>
													</div>
												</div>
												<div className="text-right ml-4">
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
														{transaction.currency}{" "}
														{Math.abs(
															transaction.amount,
														)}
													</p>
													<p className="text-xs text-gray-500 mt-0.5 capitalize">
														{
															transaction.transaction_type
														}
													</p>
												</div>
											</div>
										</div>
									),
								)}
							</div>

							{/* Pagination */}
							{filteredTransactions.length > itemsPerPage && (
								<div className="bg-gray-50 px-5 py-4 border-t border-gray-200">
									<div className="flex items-center justify-between">
										<div className="text-sm text-gray-700">
											Showing{" "}
											<span className="font-medium">
												{indexOfFirstTransaction + 1}
											</span>{" "}
											to{" "}
											<span className="font-medium">
												{Math.min(
													indexOfLastTransaction,
													filteredTransactions.length,
												)}
											</span>{" "}
											of{" "}
											<span className="font-medium">
												{filteredTransactions.length}
											</span>{" "}
											transactions
										</div>
										<div className="flex items-center gap-1">
											<button
												onClick={() =>
													paginate(currentPage - 1)
												}
												disabled={currentPage === 1}
												className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M15 19l-7-7 7-7"
													/>
												</svg>
											</button>

											{getPageNumbers().map(
												(page, idx) =>
													page === "..." ? (
														<span
															key={`ellipsis-${idx}`}
															className="px-3 py-2 text-gray-500"
														>
															...
														</span>
													) : (
														<button
															key={page}
															onClick={() =>
																paginate(page)
															}
															className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
																currentPage ===
																page
																	? "bg-blue-600 text-white"
																	: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
															}`}
														>
															{page}
														</button>
													),
											)}

											<button
												onClick={() =>
													paginate(currentPage + 1)
												}
												disabled={
													currentPage === totalPages
												}
												className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
