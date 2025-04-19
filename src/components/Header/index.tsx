'use client';

import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { cart } = useCart();

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const { user, isAuthenticated, signOut } = useAuth();

    return (
        <header className="w-full h-fit bg-[var(--background)] px-12 py-6">
            <div className="w-full h-[100px] flex justify-between items-center border-b-2 border-[var(--foreground)]">
                <div className="order-1 flex flex-row items-center gap-6">
                    <FontAwesomeIcon icon={faBars} className="size-6"></FontAwesomeIcon>
                    <Link href={"/"} className="text-2xl font-extrabold">
                        MIRA<span className="italic">SHOP</span>
                    </Link>
                </div>
                <div className="order-2 flex flex-row items-center gap-6">
                    <div className="flex flex-row items-center relative gap-6" >

                        {/* Cart */}
                        <Link href={"/cart"} className="relative inline-block">
                            <FontAwesomeIcon icon={faShoppingCart} className="size-6" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                        <div className="">Cart</div>
                    </div>
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-[var(--foreground)]">
                                Hello, {user.email}
                            </span>
                            <button
                                onClick={signOut}
                                className="bg-[var(--primary)] px-4 py-2 rounded-full text-white"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href={"/login"} className="flex items-center justify-center bg-[var(--primary)] px-6 py-2 rounded-full">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}