import React from "react";
import PaymentComponent from "./PaymentComponent";

export default function ProductCard({
	productName = "Laptop",
	description = "High-performance laptop for professionals lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	price = "$100",
	amount = 100,
	currency = "INR",
}) {
	return (
		<div className="m-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 w-full max-w-sm">
			{/* Card Content */}
			<div className="p-4 flex flex-col h-64">
				{/* Product Name */}
				<h3 className="text-xl font-bold text-gray-800 mb-4">
					{productName}
				</h3>

				{/* Description */}
				<p className="text-gray-600 text-sm flex-1 mb-4">
					{description}
				</p>
			</div>
			<div className="p-4">
				{/* Bottom Section: Price and Buy Button */}
				<div className="flex justify-between items-center space-x-4 border-t pt-4">
					<span className="text-xl font-bold text-blue-600">
						{price}
					</span>
					<PaymentComponent
						productName={productName}
						description={description}
						amount={amount}
						currency={currency}
					/>
				</div>
			</div>
		</div>
	);
}
