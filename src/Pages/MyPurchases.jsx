import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

export default function MyPurchases() {
	const [purchases, setPurchases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				setLoading(true);
				const getCookie = (name) => {
					const value = `; ${document.cookie}`;
					const parts = value.split(`; ${name}=`);
					if (parts.length === 2)
						return parts.pop().split(";").shift();
					return null;
				};
				const token = getCookie("authToken");

				const response = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/payments/my-purchases/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				setPurchases(response.data.data.purchases);
			} catch (error) {
				console.error("Error fetching purchases:", error);
				setError("Failed to load purchased products");
			} finally {
				setLoading(false);
			}
		};
		fetchPurchases();
	}, []);

	if (loading) {
		return (
			<div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-50">
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

	return (
		<div className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-900">
						My Purchased Products
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Browse and manage products you have purchased.
					</p>
				</div>

				{purchases.length === 0 ? (
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16">
						<div className="text-center">
							<p className="text-gray-500 text-sm">
								You haven't purchased any products yet.
							</p>
							<p className="text-gray-400 text-xs mt-1">
								Products you buy will appear here.
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{purchases.map((purchase) => (
							<ProductCard
								key={purchase.id}
								id={purchase.id}
								image={purchase.product_image}
								productName={purchase.product_name}
								description="Purchased Product"
								showBuyButton={false}
								showDownloadButton={true}
								disableNavigation={true}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
