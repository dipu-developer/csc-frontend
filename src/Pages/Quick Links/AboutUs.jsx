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
						Empowering businesses with innovative solutions
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
					{/* Company Overview */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Who We Are
						</h2>
						<p className="text-gray-600 leading-relaxed mb-4">
							CSC Solutions is a leading provider of innovative
							technology solutions, dedicated to helping
							businesses thrive in the digital age. Since our
							establishment, we have been committed to delivering
							excellence and creating value for our clients
							through cutting-edge services and unwavering
							support.
						</p>
						<p className="text-gray-600 leading-relaxed">
							Our team of experienced professionals works
							tirelessly to understand your unique challenges and
							deliver tailored solutions that drive growth,
							efficiency, and success.
						</p>
					</section>

					{/* Mission & Vision */}
					<section className="grid md:grid-cols-2 gap-6">
						<div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
									<svg
										className="w-6 h-6 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									Our Mission
								</h3>
							</div>
							<p className="text-gray-600 leading-relaxed">
								To empower businesses with innovative, reliable,
								and scalable solutions that transform challenges
								into opportunities for growth and success.
							</p>
						</div>

						<div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
									<svg
										className="w-6 h-6 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									Our Vision
								</h3>
							</div>
							<p className="text-gray-600 leading-relaxed">
								To be the most trusted technology partner,
								recognized globally for excellence, innovation,
								and our commitment to client success.
							</p>
						</div>
					</section>

					{/* Core Values */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-6">
							Our Core Values
						</h2>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Integrity
								</h3>
								<p className="text-sm text-gray-600">
									We conduct business with honesty,
									transparency, and ethical practices in all
									our interactions.
								</p>
							</div>

							<div className="text-center">
								<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-orange-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Innovation
								</h3>
								<p className="text-sm text-gray-600">
									We embrace creativity and continuously seek
									new ways to solve problems and improve our
									services.
								</p>
							</div>

							<div className="text-center">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Excellence
								</h3>
								<p className="text-sm text-gray-600">
									We strive for the highest quality in
									everything we do, exceeding expectations at
									every opportunity.
								</p>
							</div>
						</div>
					</section>

					{/* What We Offer */}
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

					{/* Contact CTA */}
					<section className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100">
						<h2 className="text-2xl font-semibold text-gray-900 mb-3">
							Ready to Get Started?
						</h2>
						<p className="text-gray-600 mb-6">
							Let's discuss how we can help transform your
							business.
						</p>
						<a
							href="mailto:support@cscsolutions.com"
							className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
						>
							Contact Us Today
						</a>
					</section>
				</div>
			</div>
		</div>
	);
}
