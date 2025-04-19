"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);
    const [user, setUser] = useState<{ email: string } | null>(null);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsAuthenticated(true);
            fetchUserData(token);
        } else {
            setIsLoading(false); // mark loading done if no token
        }
    }, []);
    
    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) throw new Error("Failed to fetch user data");
    
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setIsLoading(false); // loading ends after fetch
        }
    };
    

    const signUp = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setIsError(null);

        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Registration failed");
            }

            router.push("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setIsError(error.message);
            } else {
                setIsError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        setIsError(null);

        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Invalid email or password");
            }

            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            setIsAuthenticated(true);
            fetchUserData(data.access_token);
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setIsError(error.message);
            } else {
                setIsError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);
        setUser(null);
        router.push("/login");
    };

    return { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading, isError, setIsError, user, setUser, signUp, signIn, signOut };
}
