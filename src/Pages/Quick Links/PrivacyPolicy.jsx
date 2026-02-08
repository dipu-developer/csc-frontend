import React from "react";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full">
			{/* Hero Section */}
			<div className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Privacy Policy
					</h1>
					<p className="text-lg text-blue-100">
						Last updated:{" "}
						{new Date().toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
					{/* Introduction */}
					<section>
						<p className="text-gray-600 leading-relaxed">
							At CSC Solutions, we are committed to protecting
							your privacy and ensuring the security of your
							personal information. This Privacy Policy explains
							how we collect, use, disclose, and safeguard your
							information when you use our services.
						</p>
					</section>

					{/* Information We Collect */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							1. Information We Collect
						</h2>
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Personal Information
								</h3>
								<p className="text-gray-600 leading-relaxed mb-2">
									We may collect personal information that you
									provide directly to us, including but not
									limited to:
								</p>
								<ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
									<li>
										Name and contact information (email,
										phone number)
									</li>
									<li>
										Account credentials and authentication
										information
									</li>
									<li>Payment and billing information</li>
									<li>Company or business details</li>
									<li>Communication preferences</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Automatically Collected Information
								</h3>
								<p className="text-gray-600 leading-relaxed">
									When you access our services, we may
									automatically collect certain information
									about your device and usage patterns,
									including IP address, browser type,
									operating system, access times, and pages
									viewed.
								</p>
							</div>
						</div>
					</section>

					{/* How We Use Your Information */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							2. How We Use Your Information
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							We use the information we collect for various
							purposes, including:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
							<li>
								Providing, maintaining, and improving our
								services
							</li>
							<li>
								Processing transactions and sending related
								information
							</li>
							<li>
								Sending administrative information, updates, and
								security alerts
							</li>
							<li>
								Responding to your comments, questions, and
								customer service requests
							</li>
							<li>
								Monitoring and analyzing usage patterns and
								trends
							</li>
							<li>
								Detecting, preventing, and addressing technical
								issues and fraud
							</li>
							<li>
								Personalizing your experience and delivering
								relevant content
							</li>
						</ul>
					</section>

					{/* Information Sharing */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							3. Information Sharing and Disclosure
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							We do not sell, trade, or rent your personal
							information to third parties. We may share your
							information only in the following circumstances:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
							<li>With your consent or at your direction</li>
							<li>
								With service providers who assist us in
								operating our business
							</li>
							<li>
								To comply with legal obligations, court orders,
								or government requests
							</li>
							<li>
								To protect our rights, privacy, safety, or
								property, and that of our users
							</li>
							<li>
								In connection with a merger, acquisition, or
								sale of assets
							</li>
						</ul>
					</section>

					{/* Data Security */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							4. Data Security
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We implement appropriate technical and
							organizational security measures to protect your
							personal information against unauthorized access,
							alteration, disclosure, or destruction. However, no
							method of transmission over the Internet or
							electronic storage is 100% secure, and we cannot
							guarantee absolute security.
						</p>
					</section>

					{/* Data Retention */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							5. Data Retention
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We retain your personal information only for as long
							as necessary to fulfill the purposes outlined in
							this Privacy Policy, unless a longer retention
							period is required or permitted by law. When we no
							longer need your information, we will securely
							delete or anonymize it.
						</p>
					</section>

					{/* Your Rights */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							6. Your Rights and Choices
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							Depending on your location, you may have certain
							rights regarding your personal information:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
							<li>
								Access and receive a copy of your personal
								information
							</li>
							<li>Correct or update inaccurate information</li>
							<li>
								Request deletion of your personal information
							</li>
							<li>
								Object to or restrict certain processing
								activities
							</li>
							<li>Withdraw consent where we rely on it</li>
							<li>
								Data portability to another service provider
							</li>
						</ul>
						<p className="text-gray-600 leading-relaxed mt-3">
							To exercise these rights, please contact us using
							the information provided below.
						</p>
					</section>

					{/* Cookies */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							7. Cookies and Tracking Technologies
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We use cookies and similar tracking technologies to
							track activity on our services and store certain
							information. You can instruct your browser to refuse
							all cookies or to indicate when a cookie is being
							sent. However, if you do not accept cookies, you may
							not be able to use some portions of our services.
						</p>
					</section>

					{/* Third-Party Links */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							8. Third-Party Links
						</h2>
						<p className="text-gray-600 leading-relaxed">
							Our services may contain links to third-party
							websites or services that are not owned or
							controlled by CSC Solutions. We are not responsible
							for the privacy practices of these third parties. We
							encourage you to review their privacy policies
							before providing any personal information.
						</p>
					</section>

					{/* Children's Privacy */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							9. Children's Privacy
						</h2>
						<p className="text-gray-600 leading-relaxed">
							Our services are not intended for individuals under
							the age of 18. We do not knowingly collect personal
							information from children. If you are a parent or
							guardian and believe your child has provided us with
							personal information, please contact us so we can
							delete it.
						</p>
					</section>

					{/* Changes to Policy */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							10. Changes to This Privacy Policy
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We may update this Privacy Policy from time to time.
							We will notify you of any changes by posting the new
							Privacy Policy on this page and updating the "Last
							updated" date. We encourage you to review this
							Privacy Policy periodically for any changes.
						</p>
					</section>

					{/* Contact Information */}
					<section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							11. Contact Us
						</h2>
						<p className="text-gray-600 leading-relaxed mb-4">
							If you have any questions, concerns, or requests
							regarding this Privacy Policy or our privacy
							practices, please contact us:
						</p>
						<div className="space-y-2 text-gray-700">
							<p className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<a
									href="mailto:support@cscsolutions.com"
									className="text-blue-600 hover:text-blue-700"
								>
									support@cscsolutions.com
								</a>
							</p>
							<p className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								<span>+91 98765 43210</span>
							</p>
							<p className="flex items-start gap-2">
								<svg
									className="w-5 h-5 text-blue-600 mt-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span>
									123 Business Avenue, Tech District
									<br />
									City - 123456
								</span>
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
