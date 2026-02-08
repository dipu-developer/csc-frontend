import React from "react";

export default function TermsAndConditions() {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full">
			{/* Hero Section */}
			<div className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Terms & Conditions
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
							Welcome to CSC Solutions. These Terms and Conditions
							govern your use of our services and constitute a
							legally binding agreement between you and CSC
							Solutions. By accessing or using our services, you
							agree to be bound by these terms.
						</p>
					</section>

					{/* Acceptance of Terms */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							1. Acceptance of Terms
						</h2>
						<p className="text-gray-600 leading-relaxed">
							By creating an account, accessing, or using any part
							of our services, you acknowledge that you have read,
							understood, and agree to be bound by these Terms and
							Conditions. If you do not agree with any part of
							these terms, you must not use our services.
						</p>
					</section>

					{/* Account Registration */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							2. Account Registration and Security
						</h2>
						<div className="space-y-3">
							<p className="text-gray-600 leading-relaxed">
								To access certain features of our services, you
								may be required to register for an account. When
								registering, you agree to:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
								<li>
									Provide accurate, current, and complete
									information
								</li>
								<li>
									Maintain and update your information to keep
									it accurate
								</li>
								<li>
									Maintain the security of your password and
									account
								</li>
								<li>
									Accept responsibility for all activities
									under your account
								</li>
								<li>
									Notify us immediately of any unauthorized
									use of your account
								</li>
							</ul>
							<p className="text-gray-600 leading-relaxed mt-3">
								You must be at least 18 years old to create an
								account and use our services.
							</p>
						</div>
					</section>

					{/* User Obligations */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							3. User Obligations and Prohibited Activities
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							When using our services, you agree not to:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
							<li>
								Violate any applicable laws, regulations, or
								third-party rights
							</li>
							<li>
								Use our services for any illegal, harmful, or
								fraudulent purposes
							</li>
							<li>
								Interfere with or disrupt the integrity or
								performance of our services
							</li>
							<li>
								Attempt to gain unauthorized access to any part
								of our services
							</li>
							<li>
								Upload or transmit viruses, malware, or other
								malicious code
							</li>
							<li>
								Engage in any form of spam, phishing, or
								unsolicited marketing
							</li>
							<li>
								Impersonate any person or entity or misrepresent
								your affiliation
							</li>
							<li>
								Reverse engineer, decompile, or attempt to
								extract source code
							</li>
						</ul>
					</section>

					{/* Intellectual Property */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							4. Intellectual Property Rights
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							All content, features, and functionality of our
							services, including but not limited to text,
							graphics, logos, icons, images, audio clips, and
							software, are the exclusive property of CSC
							Solutions or its licensors and are protected by
							international copyright, trademark, and other
							intellectual property laws.
						</p>
						<p className="text-gray-600 leading-relaxed">
							You are granted a limited, non-exclusive,
							non-transferable license to access and use our
							services for your personal or internal business
							purposes. You may not reproduce, distribute, modify,
							create derivative works of, publicly display, or
							exploit any of our content without our express
							written permission.
						</p>
					</section>

					{/* Payment Terms */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							5. Payment and Billing
						</h2>
						<div className="space-y-3">
							<p className="text-gray-600 leading-relaxed">
								If you purchase any services or products from
								us:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
								<li>
									You agree to pay all applicable fees and
									charges according to the pricing and payment
									terms in effect
								</li>
								<li>
									All payments are processed securely through
									our payment providers
								</li>
								<li>
									Fees are non-refundable except as expressly
									stated in our refund policy
								</li>
								<li>
									You authorize us to charge your selected
									payment method for all fees
								</li>
								<li>
									You are responsible for all applicable taxes
									related to your purchases
								</li>
								<li>
									We reserve the right to change our pricing
									with reasonable notice
								</li>
							</ul>
						</div>
					</section>

					{/* Service Modifications */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							6. Service Modifications and Availability
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We reserve the right to modify, suspend, or
							discontinue any part of our services at any time,
							with or without notice. We will not be liable to you
							or any third party for any modification, suspension,
							or discontinuation of our services. We do not
							guarantee that our services will always be
							available, uninterrupted, or error-free.
						</p>
					</section>

					{/* Disclaimer */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							7. Disclaimer of Warranties
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							Our services are provided "as is" and "as available"
							without any warranties of any kind, either express
							or implied, including but not limited to:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
							<li>
								Implied warranties of merchantability or fitness
								for a particular purpose
							</li>
							<li>
								Non-infringement of intellectual property rights
							</li>
							<li>
								Accuracy, reliability, or completeness of
								content
							</li>
							<li>Uninterrupted or error-free operation</li>
						</ul>
						<p className="text-gray-600 leading-relaxed mt-3">
							We do not warrant that our services will meet your
							requirements or that any defects will be corrected.
						</p>
					</section>

					{/* Limitation of Liability */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							8. Limitation of Liability
						</h2>
						<p className="text-gray-600 leading-relaxed">
							To the maximum extent permitted by law, CSC
							Solutions and its officers, directors, employees,
							and agents shall not be liable for any indirect,
							incidental, special, consequential, or punitive
							damages, or any loss of profits or revenues, whether
							incurred directly or indirectly, or any loss of
							data, use, goodwill, or other intangible losses
							resulting from your use or inability to use our
							services.
						</p>
					</section>

					{/* Indemnification */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							9. Indemnification
						</h2>
						<p className="text-gray-600 leading-relaxed">
							You agree to indemnify, defend, and hold harmless
							CSC Solutions and its officers, directors,
							employees, contractors, and agents from and against
							any claims, liabilities, damages, losses, and
							expenses, including reasonable legal fees, arising
							out of or in any way connected with your access to
							or use of our services, your violation of these
							Terms, or your violation of any third-party rights.
						</p>
					</section>

					{/* Termination */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							10. Termination
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We may terminate or suspend your account and access
							to our services immediately, without prior notice or
							liability, for any reason, including if you breach
							these Terms. Upon termination, your right to use our
							services will immediately cease. You may also
							terminate your account at any time by contacting us.
							All provisions that should reasonably survive
							termination will continue to apply.
						</p>
					</section>

					{/* Governing Law */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							11. Governing Law and Dispute Resolution
						</h2>
						<p className="text-gray-600 leading-relaxed mb-3">
							These Terms shall be governed by and construed in
							accordance with the laws of India, without regard to
							its conflict of law provisions. Any dispute arising
							from or relating to these Terms or our services
							shall be subject to the exclusive jurisdiction of
							the courts located in [Your City], India.
						</p>
						<p className="text-gray-600 leading-relaxed">
							Before filing any legal claim, you agree to first
							contact us and attempt to resolve the dispute
							informally.
						</p>
					</section>

					{/* Changes to Terms */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							12. Changes to Terms
						</h2>
						<p className="text-gray-600 leading-relaxed">
							We reserve the right to modify these Terms at any
							time. We will notify you of any material changes by
							posting the updated Terms on our website and
							updating the "Last updated" date. Your continued use
							of our services after such changes constitutes your
							acceptance of the new Terms.
						</p>
					</section>

					{/* Severability */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							13. Severability
						</h2>
						<p className="text-gray-600 leading-relaxed">
							If any provision of these Terms is found to be
							unenforceable or invalid, that provision shall be
							limited or eliminated to the minimum extent
							necessary so that these Terms shall otherwise remain
							in full force and effect.
						</p>
					</section>

					{/* Entire Agreement */}
					<section>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							14. Entire Agreement
						</h2>
						<p className="text-gray-600 leading-relaxed">
							These Terms, together with our Privacy Policy and
							any other legal notices published by us, constitute
							the entire agreement between you and CSC Solutions
							concerning our services and supersede all prior
							agreements and understandings.
						</p>
					</section>

					{/* Contact Information */}
					<section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							15. Contact Information
						</h2>
						<p className="text-gray-600 leading-relaxed mb-4">
							If you have any questions or concerns about these
							Terms and Conditions, please contact us:
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

					{/* Acceptance */}
					<section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 text-center">
						<p className="text-gray-700 leading-relaxed">
							By using our services, you acknowledge that you have
							read and understood these Terms and Conditions and
							agree to be bound by them.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
