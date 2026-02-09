import React from "react";

export default function InfoPopup({ isOpen, onClose, title, description }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
				<div className="text-center mb-6">
					<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-6 h-6 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900">
						{title}
					</h3>
					<p className="text-sm text-gray-500 mt-2">{description}</p>
				</div>

				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
}
