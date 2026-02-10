import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ServiceCard from "../../Components/Cards/ServiceCard";
import InfoPopup from "../../Components/PopUp/InfoPopup";

function Services() {
	const navigate = useNavigate();
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [infoPopupState, setInfoPopupState] = useState({
		isOpen: false,
		title: "",
		description: "",
		onClose: null,
	});

	useEffect(() => {
		const fetchServices = async () => {
			try {
				setLoading(true);
				const getCookie = (name) => {
					const value = `; ${document.cookie}`;
					const parts = value.split(`; ${name}=`);
					if (parts.length === 2)
						return parts.pop().split(";").shift();
					return null;
				};
				const token = getCookie("authToken");

				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/services/list/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);

				const data = response.data.data;
				if (Array.isArray(data)) {
					setServices(data);
					console.log(data);
				} else if (data && Array.isArray(data.services)) {
					setServices(data.services);
					console.log(data.services);
				} else {
					setServices([]);
				}
			} catch (error) {
				console.error("Error fetching services:", error);
				if (error.response && error.status === 403) {
					setInfoPopupState({
						isOpen: true,
						title: "Pro Feature Only",
						description:
							"This feature is available for PRO users only.",
						onClose: () => navigate("/"),
					});
				}
			} finally {
				setLoading(false);
			}
		};
		fetchServices();
	}, []);
	if (loading) {
		return (
			<div className="  w-full flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="  w-full flex items-center justify-center bg-gray-50">
				<div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
					<div className="flex items-center gap-3 text-red-600">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="text-sm font-medium">{error}</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="  w-full bg-gray-50 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-900">
						Services
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Browse available services
					</p>
				</div>

				{/* Services Grid */}
				{services.length === 0 ? (
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16">
						<div className="text-center">
							<svg
								className="w-16 h-16 text-gray-300 mx-auto mb-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<p className="text-gray-500 text-sm">
								No services available
							</p>
							<p className="text-gray-400 text-xs mt-1">
								Check back later for new services
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{services.map((service) => (
							<ServiceCard
								key={service.service_code}
								id={service.service_code}
								image={service.image_url}
								productName={service.name}
								description={service.description}
								price={
									service.price
										? `${service.currency || "INR"} ${
												service.price
											}`
										: undefined
								}
								amount={service.price}
								currency={service.currency}
								basePath="/services"
							/>
						))}
					</div>
				)}
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

export default Services;
