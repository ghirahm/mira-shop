"use client";

import { useState } from "react";
import Alert from "@/components/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { signIn, isLoading, isError, setIsError } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn(email, password);
    };

    return (
        <div className="min-[80vh] flex items-center justify-center bg-[var(--background)] px-6">
            {isError && <Alert isError={isError} setIsError={setIsError} />}

            <div className="w-full max-w-md flex flex-col items-center justify-center gap-6 p-6 bg-[var(--background)] rounded-2xl border-2 border-[var(--foreground)] space-y-6">
                <h1 className="text-3xl font-bold text-center text-[var(--foreground)] mb-6">
                    Mira<span className="italic">Shop</span> Login
                </h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="relative">
                        <FontAwesomeIcon icon={faUser} className="absolute size-4 left-4 top-3.5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--background)] border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]"
                        />
                    </div>
                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute size-4 left-4 top-3.5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--background)] border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[var(--foreground)] text-[var(--background)] py-2 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-500">
                    New here?{" "}
                    <a href="/register" className="text-[var(--foreground)] font-semibold">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
