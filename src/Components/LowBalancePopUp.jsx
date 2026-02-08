import React from "react";
import { useNavigate } from "react-router-dom";

export default function LowBalancePopUp({
	isOpen,
	onClose,
	balanceInfo,
	currency,
}) {
	const navigate = useNavigate();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
				<div className="text-center mb-6">
					<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-6 h-6 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900">
						Insufficient Balance
					</h3>
					<p className="text-sm text-gray-500 mt-2">
						You don't have enough balance in your wallet to purchase
						this product.
					</p>
				</div>

				<div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Required Amount:</span>
						<span className="font-medium text-gray-900">
							{currency} {balanceInfo?.required}
						</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">
							Available Balance:
						</span>
						<span className="font-medium text-gray-900">
							{currency} {balanceInfo?.available}
						</span>
					</div>
					<div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
						<span className="font-medium text-red-600">
							Shortfall:
						</span>
						<span className="font-bold text-red-600">
							{currency} {balanceInfo?.shortfall}
						</span>
					</div>
				</div>

				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={() => navigate("/wallet")}
						className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
					>
						Add Money
					</button>
				</div>
			</div>
		</div>
	);
}
