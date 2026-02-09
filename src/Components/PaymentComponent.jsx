import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InfoPopup from "./InfoPopup";

const PaymentComponent = ({
	productId,
	productName = "Product",
	description = "Product description",
	amount = 100,
	currency = "INR",
}) => {
	const [loading, setLoading] = useState(false);
	const [throttled, setThrottled] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [infoPopupState, setInfoPopupState] = useState({
		isOpen: false,
		title: "",
		description: "",
		onClose: null,
	});
	const navigate = useNavigate();

	const handlePayment = async () => {
		if (!productId) {
			setInfoPopupState({
				isOpen: true,
				title: "Error",
				description: "Invalid product",
			});
			return;
		}

		if (!window.confirm("Are you sure you want to buy this product?")) {
			return;
		}

		try {
			setLoading(true);
			const getCookie = (name) => {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) return parts.pop().split(";").shift();
				return null;
			};
			const token = getCookie("authToken");

			if (!token) {
				setInfoPopupState({
					isOpen: true,
					title: "Authentication Required",
					description: "Please login to purchase products.",
					onClose: () => navigate("/login"),
				});
				return;
			}

			const backend = import.meta.env.VITE_BACKEND_URL;
			await axios.post(
				`${backend}/api/payments/purchase/`,
				{ product_id: productId },
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);

			setShowSuccessPopup(true);
		} catch (err) {
			console.error(err);
			let msg;

			if (err.response?.status === 429) {
				const retryAfter = err.response.headers?.["retry-after"];
				const waitHours = retryAfter ? Math.ceil(retryAfter) : 1; // Wait for seconds from header or default

				msg = `You are making too many requests. Please wait ${waitHours} hours before trying again.`;

				setThrottled(true);
				setTimeout(
					() => setThrottled(false),
					waitHours * 60 * 60 * 1000,
				);
			} else {
				msg =
					err.response?.data?.message ||
					err.response?.data?.detail ||
					"Purchase error: " + err.message;
			}

			setInfoPopupState({
				isOpen: true,
				title: "Error",
				description: msg,
				onClose: () => {
					if (msg && msg.toLowerCase().includes("wallet")) {
						navigate("/wallet");
					}
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<button
				onClick={handlePayment}
				disabled={loading || throttled}
				className="bg-blue-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200 disabled:opacity-50"
			>
				{loading
					? "Processing..."
					: throttled
						? "Please wait..."
						: "Buy Now"}
			</button>
			<InfoPopup
				isOpen={showSuccessPopup}
				onClose={() => {
					setShowSuccessPopup(false);
					navigate("/my_purchases");
				}}
				title="Purchase Successful!"
				description={`You have successfully purchased ${productName}.`}
			/>
			<InfoPopup
				isOpen={infoPopupState.isOpen}
				onClose={() => {
					setInfoPopupState((prev) => ({ ...prev, isOpen: false }));
					if (infoPopupState.onClose) infoPopupState.onClose();
				}}
				title={infoPopupState.title}
				description={infoPopupState.description}
			/>
		</>
	);
};

export default PaymentComponent;
