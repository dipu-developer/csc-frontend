import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const getCookie = (name) => {
					const value = `; ${document.cookie}`;
					const parts = value.split(`; ${name}=`);
					if (parts.length === 2)
						return parts.pop().split(";").shift();
					return null;
				};
				const token = getCookie("authToken");

				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/payments/products/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				console.log(response.data.data.products);
				setProducts(response.data.data.products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);

	return (
		<div className="flex flex-wrap mx-[8%] p-2 min-h-screen">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					id={product.id}
					image={product.image_url || undefined}
					productName={product.name}
					description={product.description}
					price={`${product.currency} ${product.price}`}
					amount={product.price}
					currency={product.currency}
				/>
			))}
		</div>
	);
}

export default Home;
