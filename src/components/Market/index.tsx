"use client";

import Card from "@/components/Card";
import { faFilter, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string[];
};

export default function Market() {
    const [products, setProducts] = useState<Product[]>([]);
    const { query } = useSearch();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("https://api.escuelajs.co/api/v1/products", {
                cache: "no-store",
            });
            const data: Product[] = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full h-fit flex flex-col gap-12">
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold flex flex-row items-center gap-6">
                    <FontAwesomeIcon icon={faShop} className="size-6" /> Fresh Picks for Your Aesthetic
                </h2>
                <h2 className="text-md font-bold bg-[var(--foreground)] text-[var(--background)] rounded-full px-6 py-2 flex flex-row items-center gap-6">
                    <FontAwesomeIcon icon={faFilter} className="size-6" />Show Filters
                </h2>
            </div>

            {/* Product Details */}
            <div className="w-full h-fit grid grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Card
                        key={product.id}
                        id={product.id}
                        image={product.images[0]}
                        title={product.title}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
}
