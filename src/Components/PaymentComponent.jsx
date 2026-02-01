import React, { useState, useEffect } from "react";

const PaymentComponent = ({
	productName = "Product",
	description = "Product description",
	amount = 100,
	currency = "INR",
}) => {
	const [isSdkLoaded, setIsSdkLoaded] = useState(false);

	useEffect(() => {
		const loadRazorpayScript = () => {
			if (window.Razorpay) {
				setIsSdkLoaded(true);
				return;
			}

			const scriptSrc = "https://checkout.razorpay.com/v1/checkout.js";
			let script = document.querySelector(`script[src="${scriptSrc}"]`);

			if (!script) {
				script = document.createElement("script");
				script.src = scriptSrc;
				script.async = true;
				document.body.appendChild(script);
			}

			script.addEventListener("load", () => setIsSdkLoaded(true));
		};

		loadRazorpayScript();
	}, []);

	const handlePayment = async () => {
		if (!isSdkLoaded) {
			alert("Razorpay SDK is loading. Please wait...");
			return;
		}

		try {
			// Load logged-in user details from localStorage
			const authEmail = localStorage.getItem("authUser");
			let userData = {
				name: "",
				email: authEmail || "",
				contact: "",
			};

			if (authEmail) {
				const usersJson = localStorage.getItem("users") || "[]";
				const users = JSON.parse(usersJson);
				const user = users.find((u) => u.email === authEmail);
				if (user) {
					userData = {
						name: `${user.firstName} ${user.lastName}`.trim(),
						email: user.email,
						contact: user.phoneNumber || "",
					};
				}
			}

			// Get order_id from backend
			const backend =
				import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
			const orderRes = await fetch(`${backend}/create-order`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount,
					currency,
					userDetails: userData,
				}),
			});

			if (!orderRes.ok) {
				alert("Failed to create order");
				return;
			}

			const order = await orderRes.json();
			if (!order || !order.id) {
				alert("Invalid order response");
				return;
			}

			const options = {
				key:
					import.meta.env.VITE_RAZORPAY_KEY ||
					"rzp_test_S9iSUJwVgEC7WB",
				amount: Math.round(amount * 100),
				currency,
				name: productName,
				description,
				order_id: order.id,
				handler: (response) => {
					console.log(response);
					alert("Payment Successful!");
				},
				prefill: userData,
				theme: {
					color: "#F37254",
				},
			};

			const razorpayInstance = new window.Razorpay(options);
			razorpayInstance.open();
		} catch (err) {
			console.error(err);
			alert("Payment error: " + err.message);
		}
	};

	return (
		<button
			onClick={handlePayment}
			disabled={!isSdkLoaded}
			className="bg-blue-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200 disabled:opacity-50"
		>
			Buy
		</button>
	);
};

export default PaymentComponent;
