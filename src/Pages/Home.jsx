import React from "react";
import ProductCard from "../Components/ProductCard";

function Home() {
	return (
		<div className="flex flex-wrap mx-[8%] p-2 min-h-screen">
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	);
}

export default Home;
