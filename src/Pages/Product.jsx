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

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="animate-pulse text-xl font-semibold text-gray-600">
					Loading Product...
				</div>
			</div>
		);

	if (error)
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="text-red-500 text-xl font-semibold bg-white p-8 rounded-lg shadow-md">
					{error}
				</div>
			</div>
		);

	if (!product)
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="text-gray-600 text-xl font-semibold">
					Product not found
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<button
					onClick={() => navigate("/")}
					className="group mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
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
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to Products
				</button>

				<div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
					{/* Image Section */}
					<div className="relative">
						<div className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
							<img
								src={
									product.image_url ||
									"https://placehold.co/600x400"
								}
								alt={product.name}
								className="object-contain object-center w-full h-[500px]"
							/>
						</div>
					</div>

					{/* Product Info Section */}
					<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 flex flex-col">
						<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
							{product.name}
						</h1>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900 font-medium">
								{product.currency} {product.price}
							</p>
						</div>

						<div className="mt-8 border-t border-gray-200 pt-8">
							<h3 className="text-sm font-medium text-gray-900">
								Description
							</h3>
							<div className="mt-4 prose prose-sm text-gray-500">
								<p className="leading-relaxed text-lg">
									{product.description}
								</p>
							</div>
						</div>

						<div className="mt-auto pt-10 flex sm:flex-col">
							<div className="w-full max-w-xs">
								<PaymentComponent
									productName={product.name}
									description={product.description}
									amount={product.price}
									currency={product.currency}
								/>
							</div>
						</div>

						<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="flex items-center gap-3 text-sm text-gray-500">
								<svg
									className="h-5 w-5 text-green-500"
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
								Secure Payment
							</div>
							<div className="flex items-center gap-3 text-sm text-gray-500">
								<svg
									className="h-5 w-5 text-blue-500"
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
								Instant Delivery
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
