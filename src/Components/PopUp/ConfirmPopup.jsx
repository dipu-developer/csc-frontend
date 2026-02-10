import React from "react";

const ConfirmPopup = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	price,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden transform transition-all">
				<div className="p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						{title}
					</h3>
					<div className="mt-6">
						<p className="text-gray-600 text-sm mb-2">
							{description}
						</p>
						<p className="text-gray-600 text-sm mb-6">
							{price} will be deducted from your wallet.
						</p>
					</div>
					<div className="flex justify-end gap-3">
						<button
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
						>
							{cancelText}
						</button>
						<button
							onClick={() => {
								onConfirm();
								onClose();
							}}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							{confirmText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmPopup;
