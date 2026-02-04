import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="animate-pulse text-xl font-semibold text-gray-600">
					Loading Transactions...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="text-red-500 text-xl font-semibold bg-white p-8 rounded-lg shadow-md">
					{error}
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Transaction History
				</h1>

				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					{transactions.length === 0 ? (
						<div className="p-6 text-center text-gray-500">
							No transactions found.
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Date
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Description
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Type
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Amount
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Status
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{transactions.map((transaction) => (
										<tr key={transaction.id}>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{new Date(
													transaction.created_at,
												).toLocaleDateString()}{" "}
												{new Date(
													transaction.created_at,
												).toLocaleTimeString()}
											</td>
											<td className="px-6 py-4 text-sm text-gray-900">
												{transaction.description}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm">
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
														transaction.transaction_type ===
														"credit"
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}
												>
													{transaction.transaction_type.toUpperCase()}
												</span>
											</td>
											<td
												className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.transaction_type === "credit" ? "text-green-600" : "text-red-600"}`}
											>
												{transaction.transaction_type ===
												"credit"
													? "+"
													: "-"}{" "}
												{transaction.currency}{" "}
												{transaction.amount}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm">
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === "completed" ? "bg-green-100 text-green-800" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
												>
													{transaction.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
