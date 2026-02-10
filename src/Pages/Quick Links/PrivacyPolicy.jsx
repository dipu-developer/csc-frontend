import React from "react";
import Footer from "../../Components/Footer";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full">
			{/* Hero Section */}
			<div className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Privacy Policy
					</h1>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
					{/* Introduction */}
					<section>
						<p className="text-gray-600 leading-relaxed">
							We value the privacy of our users and are committed
							to handling personal information with appropriate
							care and responsibility. Any information collected
							through this website, including but not limited to
							name, email address, contact details, and
							transaction-related data, is collected solely for
							the purpose of providing requested services,
							improving user experience, processing orders, and
							maintaining operational functionality of the
							platform. We do not sell, rent, or intentionally
							share users personal data with third parties for
							marketing or commercial purposes, except where
							disclosure may be required to comply with applicable
							laws, legal processes, or authorized governmental
							requests. Reasonable administrative, technical, and
							security measures may be implemented to protect user
							information; however, users acknowledge that no
							digital transmission or storage system can be
							guaranteed to be completely secure. By using this
							website, users consent to the collection and use of
							their information in accordance with this policy.
							The website reserves the right to update or modify
							this Privacy Policy from time to time to reflect
							operational, legal, or regulatory changes, and
							continued use of the website after such updates
							shall constitute acceptance of the revised policy.
						</p>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	);
}
