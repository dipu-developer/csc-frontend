import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentComponent from "./PaymentComponent";

export default function ProductCard({
	id,
	image,
	productName,
	description,
	price,
	amount,
	currency,
	showBuyButton = true,
	showDownloadButton = false,
	disableNavigation = false,
}) {
	const navigate = useNavigate();
	const [isDownloading, setIsDownloading] = useState(false);

	// Placeholder image if none provided
	const displayImage =
		image || "https://via.placeholder.com/400x300?text=No+Image";

	const handleDownload = async (e) => {
		e.stopPropagation();
		if (isDownloading) return;

		try {
			setIsDownloading(true);
			const getCookie = (name) => {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) return parts.pop().split(";").shift();
				return null;
			};
			const token = getCookie("authToken");

			if (!token) {
				alert("Please login to download.");
				return;
			}

			const backendUrl = import.meta.env.VITE_BACKEND_URL;

			// 1. Generate Download Token
			const response = await axios.post(
				`${backendUrl}/api/payments/generate-download-token/`,
				{ purchase_id: id },
				{ headers: { Authorization: `Bearer ${token}` } },
			);

			if (response.data.status === "success") {
				const downloadToken = response.data.data.token;
				const downloadUrl = `${backendUrl}/api/payments/download/${downloadToken}/`;

				// 2. Trigger Download via temporary link
				const link = document.createElement("a");
				link.href = downloadUrl;
				link.setAttribute("download", "");
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		} catch (error) {
			console.error("Download failed:", error);
			alert(
				error.response?.data?.message ||
					"Failed to download file. Please try again.",
			);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div
			onClick={() => !disableNavigation && navigate(`/product/${id}`)}
			className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group ${
				disableNavigation ? "" : "cursor-pointer"
			}`}
		>
			{/* Product Image */}
			<div className="aspect-[4/3] overflow-hidden bg-gray-100">
				<img
					src={displayImage}
					alt={productName}
					className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
				/>
			</div>

			{/* Card Content */}
			<div className="p-5">
				{/* Product Name */}
				<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
					{productName}
				</h3>

				{/* Description */}
				<p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
					{description}
				</p>

				{/* Bottom Section: Price and Buy Button */}
				<div className="flex items-center justify-between pt-4 border-t border-gray-100">
					{price && (
						<div>
							<p className="text-xs text-gray-500 mb-1">Price</p>
							<p className="text-xl font-semibold text-blue-600">
								{price}
							</p>
						</div>
					)}
					{showBuyButton ? (
						<div onClick={(e) => e.stopPropagation()}>
							<PaymentComponent
								productId={id}
								productName={productName}
								description={description}
								amount={amount}
								currency={currency}
							/>
						</div>
					) : showDownloadButton ? (
						<button
							onClick={handleDownload}
							disabled={isDownloading}
							className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-sm disabled:opacity-50"
						>
							{isDownloading ? "Downloading..." : "Download"}
						</button>
					) : (
						<button
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/product/${id}`);
							}}
							className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
						>
							View
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
