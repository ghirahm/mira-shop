'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StaticImageData } from "next/image";

interface Product {
    title: string;
    price: number;
    quantity: number;
    image: string | StaticImageData;
}

interface CartContextProps {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (title: string) => void;
    handleCheckout: () => void;
    isCheckOut: string | null;
    setIsCheckOut: (value: string | null) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCheckOut, setIsCheckOut] = useState<string | null>(null);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.title === product.title);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (title: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.title !== title));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            setIsCheckOut('Your Cart is Empty!');
        } else {
            setIsCheckOut('Proceed Check Out!');
            setCart([]);
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, handleCheckout, isCheckOut, setIsCheckOut }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
