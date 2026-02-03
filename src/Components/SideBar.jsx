import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("authUser");
		window.dispatchEvent(new Event("authChanged"));
		navigate("/login");
	};

	return (
		<div className="w-64 bg-white h-full shadow-lg flex flex-col border-r border-gray-200">
			<div className="flex-1 py-6 flex flex-col space-y-2">
				<Link
					to="/assets"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Assets
				</Link>
				<Link
					to="/transactions"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Transactions
				</Link>
				<Link
					to="/wallet"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Wallet
				</Link>
				<Link
					to="/account"
					className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200"
				>
					Account
				</Link>
			</div>
			<div className="p-4 border-t border-gray-200">
				<button
					onClick={handleLogout}
					className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors duration-200"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
