'use client';
/* eslint-disable @next/next/no-img-element */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface CardProps {
    id: number;
    image: string;
    title: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ id, image, title, price }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToCart({ title, price, quantity: 1, image });
    };

    return (
        <Link href={`/product/${id}`} className="relative w-full h-80 rounded-2xl overflow-hidden transition-all group">
            <img
                src={image}
                alt={title}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            <div className="absolute top-3 left-4 z-20 text-[var(--foreground)] font-semibold text-base bg-[var(--primary)] px-3 py-1 rounded-full">
                ${price}
            </div>

            <div className="absolute bottom-3 left-4 z-20 text-[var(--foreground)] font-semibold text-base bg-[var(--background)] px-3 py-1 rounded-full max-w-[80%] truncate capitalize">
                {title}
            </div>

            <button
                onClick={handleAddToCart}
                className="absolute top-3 right-4 z-20 bg-[var(--background)] text-[var(--foreground)] p-2 rounded-full transition cursor-pointer"
                aria-label="Add to Cart"
            >
                <FontAwesomeIcon icon={faCartPlus} className="w-4 h-4" />
            </button>
        </Link>
    )
}

export default Card;