import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentComponent from "./PaymentComponent";

export default function ProductCard({
	id,
	image,
	productName,
	description,
	price,
	amount,
	currency,
}) {
	const navigate = useNavigate();

	// Placeholder image if none provided
	const displayImage =
		image || "https://via.placeholder.com/400x300?text=No+Image";

	return (
		<div
			onClick={() => navigate(`/product/${id}`)}
			className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer group"
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
					<div>
						<p className="text-xs text-gray-500 mb-1">Price</p>
						<p className="text-xl font-semibold text-blue-600">
							{price}
						</p>
					</div>
					<div onClick={(e) => e.stopPropagation()}>
						<PaymentComponent
							productName={productName}
							description={description}
							amount={amount}
							currency={currency}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
