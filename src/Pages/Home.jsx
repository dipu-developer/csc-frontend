import React from "react";

import Footer from "../Components/Footer";

function Home() {
	return (
		<div className="  flex flex-col w-full">
			<div className="flex grow p-4">
				<h1 className="text-2xl font-bold text-center">Home Page</h1>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
