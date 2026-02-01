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

	return (
		<div
			onClick={() => navigate(`/product/${id}`)}
			className="m-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 w-full border-2 border-gray-400 h-110 max-w-sm cursor-pointer"
		>
			<div className="h-48 m-1 rounded-lg overflow-hidden">
				<img
					src={image}
					alt={productName}
					className="w-full h-full object-cover"
				/>
			</div>
			{/* Card Content */}
			<div className="p-4 flex flex-col h-64">
				{/* Product Name */}
				<h3 className="text-xl font-bold text-gray-800 mb-4">
					{productName}
				</h3>

				{/* Description */}
				<p className="text-gray-600 text-sm h-8 flex-1 mb-4">
					{description?.length > 100
						? `${description.substring(0, 100)}...`
						: description}
				</p>
				<div className="py-4">
					{/* Bottom Section: Price and Buy Button */}
					<div className="flex justify-between items-center space-x-4 border-t pt-4">
						<span className="text-xl font-bold text-blue-600">
							{price}
						</span>
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
		</div>
	);
}
