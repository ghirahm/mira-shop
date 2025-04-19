/* eslint-disable @next/next/no-img-element */
/* import Placeholder from "@/assets/Placeholder.jpg"; */

import Overline from "@/components/Overline";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        slug: string;
        image: string;
        creationAt: string;
        updatedAt: string;
    };
    images: string[];
}

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="w-full aspect-square relative bg-gray-100 rounded-xl overflow-hidden">
                    {product.images?.[0] && (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="object-cover"
                        />
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <Overline title={product.category?.name} />

                    <h1 className="text-4xl font-bold text-[var(--foreground)]">{product.title}</h1>

                    <p className="text-lg font-semibold text-[var(--foreground)]">${product.price}</p>

                    <p className="text-sm text-[var(--foreground)] leading-6">{product.description}</p>

                    <button className="mt-6 bg-[var(--foreground)] text-[var(--background)] py-2 px-6 rounded-full font-semibold w-fit hover:opacity-90 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
