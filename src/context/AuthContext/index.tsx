/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isError: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => void;
    setIsError: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchUserData(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch user");

            const data = await response.json();
            setUser(data);
            setIsAuthenticated(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        setIsError(null);
        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            fetchUserData(data.access_token);
            router.push("/");
        } catch (error) {
            setIsError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
    };

    const signUp = async (name: string, email: string, password: string) => {
        try {
            setIsLoading(true);
            await fetch("https://api.escuelajs.co/api/v1/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            router.push("/login");
        } catch (error) {
            setIsError("Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, isError, signIn, signOut, signUp, setIsError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
