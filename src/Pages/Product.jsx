import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentComponent from "../Components/PaymentComponent";

export default function Product() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			if (!id || id === "undefined") {
				setError("Invalid Product ID");
				setLoading(false);
				return;
			}

			try {
				const getCookie = (name) => {
					const value = `; ${document.cookie}`;
					const parts = value.split(`; ${name}=`);
					if (parts.length === 2)
						return parts.pop().split(";").shift();
					return null;
				};
				const token = getCookie("authToken");

				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/payments/products/${id}/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				setProduct(response.data.data);
			} catch (error) {
				console.error("Error fetching product:", error);
				setError("Product not found");
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [id]);

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

	if (!product) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Product not found</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-gray-50 py-12 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Back Button */}
				<button
					onClick={() => navigate("/assets")}
					className="group mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
				>
					<svg
						className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Back to Products
				</button>

				{/* Product Content */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-2">
						{/* Image Section */}
						<div className="bg-gray-50 p-8 lg:p-12 flex items-center justify-center">
							<div className="w-full max-w-lg">
								<div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
									<img
										src={
											product.image_url ||
											"https://via.placeholder.com/600x600?text=No+Image"
										}
										alt={product.name}
										className="w-full h-full object-contain"
									/>
								</div>
							</div>
						</div>

						{/* Product Info Section */}
						<div className="p-8 lg:p-12 flex flex-col">
							{/* Product Name */}
							<h1 className="text-3xl font-semibold text-gray-900 mb-4">
								{product.name}
							</h1>

							{/* Price */}
							<div className="mb-6">
								<p className="text-sm text-gray-500 mb-1">
									Price
								</p>
								<p className="text-3xl font-semibold text-blue-600">
									{product.currency} {product.price}
								</p>
							</div>

							{/* Description */}
							<div className="mb-8 pb-8 border-b border-gray-200">
								<h3 className="text-sm font-medium text-gray-900 mb-3">
									Description
								</h3>
								<div className="text-sm text-gray-600 leading-relaxed">
									{product.description &&
									product.description.length > 500 ? (
										<>
											{isDescriptionExpanded
												? product.description
												: product.description.slice(
														0,
														500,
													) + "..."}
											<button
												onClick={() =>
													setIsDescriptionExpanded(
														!isDescriptionExpanded,
													)
												}
												className="text-blue-600 hover:text-blue-800 font-medium ml-1 focus:outline-none"
											>
												{isDescriptionExpanded
													? "Show Less"
													: "Read More"}
											</button>
										</>
									) : (
										product.description
									)}
								</div>
							</div>

							{/* Features/Benefits */}
							<div className="mb-8 pb-8 border-b border-gray-200">
								<h3 className="text-sm font-medium text-gray-900 mb-4">
									What's Included
								</h3>
								<div className="space-y-3">
									<div className="flex items-start gap-3">
										<svg
											className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<div>
											<p className="text-sm font-medium text-gray-900">
												Secure Payment
											</p>
											<p className="text-xs text-gray-500">
												Protected by industry-standard
												encryption
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<svg
											className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
										<div>
											<p className="text-sm font-medium text-gray-900">
												Instant Delivery
											</p>
											<p className="text-xs text-gray-500">
												Access immediately after
												purchase
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<svg
											className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
										<div>
											<p className="text-sm font-medium text-gray-900">
												Customer Support
											</p>
											<p className="text-xs text-gray-500">
												Get help when you need it
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Purchase Button */}
							<div className="mt-auto">
								<PaymentComponent
									productId={product.id}
									productName={product.name}
									description={product.description}
									amount={product.price}
									currency={product.currency}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Additional Information */}
				<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
						<div className="flex items-start gap-3">
							<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<div>
								<h4 className="text-sm font-medium text-gray-900 mb-1">
									Secure Checkout
								</h4>
								<p className="text-xs text-gray-500">
									Your payment information is safe with us
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
						<div className="flex items-start gap-3">
							<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
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
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div>
								<h4 className="text-sm font-medium text-gray-900 mb-1">
									Quality Guaranteed
								</h4>
								<p className="text-xs text-gray-500">
									We ensure the highest quality products
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
						<div className="flex items-start gap-3">
							<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
								<svg
									className="w-5 h-5 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</div>
							<div>
								<h4 className="text-sm font-medium text-gray-900 mb-1">
									24/7 Support
								</h4>
								<p className="text-xs text-gray-500">
									Get assistance whenever you need it
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
