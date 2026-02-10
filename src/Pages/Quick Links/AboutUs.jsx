import React from "react";

export default function AboutUs() {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full">
			{/* Hero Section */}
			<div className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						About Us
					</h1>
					<p className="text-lg md:text-xl text-blue-100">
						Welcome to Smart Citizen Help.
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
					<section>
						<p className="text-gray-600 leading-relaxed mb-4">
							This platform is built on extensive practical experience and in-depth knowledge of the digital service and cyber cafe ecosystem. Our objective is to provide clear, simple, and practical guidance that helps cyber café operators, digital service providers, and individuals efficiently perform day-to-day digital service tasks while improving productivity and professional standards.
						</p>
					</section>
					<section>
						<p className="text-gray-600 leading-relaxed">
							Through this website, users can access educational resources related to online form-filling assistance, cyber café business growth strategies, simplified explanations of various public service schemes, and step-by-step tutorials for document preparation, photo editing, ID card setup, and print workflow management. The educational materials are designed to make complex procedures easier to understand and implement in real-world working environments.
						</p>
					</section>
					<section>
						<p className="text-gray-600 leading-relaxed">
							In addition to educational content, the platform offers carefully designed digital products intended to streamline routine digital service operations. These include professionally prepared templates, print-ready formats, workflow-enhancing resources, and other productivity tools that help service providers perform tasks faster and with improved consistency.
						</p>
					</section>
					<section>
						<p className="text-gray-600 leading-relaxed">
							In addition to educational content, the platform offers carefully designed digital products intended to streamline routine digital service operations. These include professionally prepared templates, print-ready formats, workflow-enhancing resources, and other productivity tools that help service providers perform tasks faster and with improved consistency.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							What We Offer
						</h2>
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="text-gray-600">
									Comprehensive technology solutions tailored
									to your business needs
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="text-gray-600">
									24/7 dedicated customer support and
									technical assistance
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="text-gray-600">
									Scalable and secure infrastructure for
									growing businesses
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="text-gray-600">
									Expert consultation and strategic planning
									services
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
