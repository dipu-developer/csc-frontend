import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfoPopup from "../PopUp/InfoPopup";

export default function ServiceCard({
	id,
	image,
	productName,
	description,
	price,
	showBuyButton = true,
	showDownloadButton = false,
	disableNavigation = false,
	basePath = "/services",
}) {
	const navigate = useNavigate();
	const [infoPopupState, setInfoPopupState] = useState({
		isOpen: false,
		title: "",
		description: "",
		onClose: null,
	});

	return (
		<div
			onClick={() => !disableNavigation && navigate(`${basePath}/${id}`)}
			className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group ${
				disableNavigation ? "" : "cursor-pointer"
			}`}
		>
			{/* Product Image
			<div className="aspect-[4/3] overflow-hidden bg-gray-100">
				<img
					src={displayImage}
					alt={productName}
					className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
				/>
			</div> */}

			{/* Card Content */}
			<div className="p-5">
				{/* Product Name */}
				<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
					{productName}
				</h3>

				{/* Description */}
				<p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-10">
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

					<button
						onClick={(e) => {
							e.stopPropagation();
							navigate(`${basePath}/${id}`);
						}}
						className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
					>
						View
					</button>
				</div>
			</div>
			<InfoPopup
				isOpen={infoPopupState.isOpen}
				onClose={() => {
					setInfoPopupState((prev) => ({ ...prev, isOpen: false }));
					if (infoPopupState.onClose) infoPopupState.onClose();
				}}
				title={infoPopupState.title}
				description={infoPopupState.description}
			/>
		</div>
	);
}
