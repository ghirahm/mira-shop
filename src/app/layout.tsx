import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
	title: "Mira Shop - Trendy Fashion & Lifestyle Store",
	description: "Discover the latest in fashion, accessories, and lifestyle products at Mira Shop. Shop top trends, best deals, and new arrivals today!",
	keywords: ["Mira Shop", "Online Fashion Store", "Lifestyle Products"],
	authors: [{ name: "Ghirah Madani" }],
	creator: "Ghirah Madani",
	publisher: "Ghirah Madani",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<SearchProvider>
					<AuthProvider>
						<CartProvider>
							<Header />
							{children}
							<Footer />
						</CartProvider>
					</AuthProvider>
				</SearchProvider>
			</body>
		</html>
	);
}
