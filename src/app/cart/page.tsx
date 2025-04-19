'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Alert';
import { useCart } from '@/context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, handleCheckout, isCheckOut, setIsCheckOut } = useCart();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const renderEmptyCart = () => (
        <p className="text-center text-gray-600">Nothing in Your Cart</p>
    );

    const renderCartItems = () => (
        <div className="space-y-4">
            {cart.map((item) => (
                <div key={item.title} className="flex justify-between items-center py-2 border-b border-slate-950">
                    <span className="text-slate-950">{item.title} (x{item.quantity})</span>
                    <span className="text-slate-950">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                        onClick={() => removeFromCart(item.title)}
                        className="hover:underline transition-colors"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex justify-center items-start h-screen bg-white p-6">
            {isCheckOut && <Alert isError={isCheckOut} setIsError={() => setIsCheckOut(null)} />}
            <div className="bg-white border-2 rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col gap-6">
                <h2 className="font-semibold text-2xl text-center text-slate-950 mb-4">Shopping Cart</h2>

                {cart.length === 0 ? renderEmptyCart() : renderCartItems()}

                <div className="flex justify-between mt-6 mb-4">
                    <span className="font-semibold text-lg text-slate-950">TOTAL</span>
                    <span className="font-semibold text-lg text-slate-950">${totalPrice}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full rounded-lg font-semibold bg-white border-2 border-slate-950 text-[var(--color-secondary)] p-4 ease-in-out duration-300 hover:border-b-8 hover:border-[var(--primary)] focus:outline-none disabled:bg-gray-300"
                >
                    Checkout
                </button>

                <button
                    onClick={() => router.push('/')}
                    className="w-full rounded-lg font-semibold bg-white border-2 border-slate-950 text-[var(--color-secondary)] p-4 ease-in-out duration-300 hover:border-b-8 hover:border-[var(--primary)] focus:outline-none disabled:bg-gray-300"
                >
                    Back to Product
                </button>
            </div>
        </div>
    );
};

export default Cart;
