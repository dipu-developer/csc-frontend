import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

function Assets() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
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
					`${import.meta.env.VITE_BACKEND_URL}/api/payments/products/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				console.log(response.data.data.products);
				setProducts(response.data.data.products);
			} catch (error) {
				console.error("Error fetching products:", error);
				setError("Failed to load products");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

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

	return (
		<div className="min-h-screen w-full bg-gray-50 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-900">
						Products
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Browse and purchase available products
					</p>
				</div>

				{/* Products Grid */}
				{products.length === 0 ? (
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16">
						<div className="text-center">
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
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
							<p className="text-gray-500 text-sm">
								No products available
							</p>
							<p className="text-gray-400 text-xs mt-1">
								Check back later for new products
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								id={product.id}
								image={product.image_url || undefined}
								productName={product.name}
								description={product.description}
								price={`${product.currency} ${product.price}`}
								amount={product.price}
								currency={product.currency}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Assets;
