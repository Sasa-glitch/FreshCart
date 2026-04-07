import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import FeaturesBar from "./_components/FeaturesBar/FeaturesBar";
import { Toaster } from "sonner";
import SessionProviderClient from "./_components/SessionProviderClient/SessionProviderClient";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FreshCart - Fresh Products Delivered to Your Door",
    description:
        "Your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.",
};

import { CartProvider } from "./_context/CartContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.className} h-full antialiased`}>
            <body className="min-h-full flex flex-col bg-white text-gray-800">
                <SessionProviderClient>
                    <CartProvider>
                        <Navbar />
                        <main className="flex-1 bg-gray-50/50">{children}</main>
                    </CartProvider>
                        <FeaturesBar />
                        <Footer />
                        <Toaster />
                </SessionProviderClient>
            </body>
        </html>
    );
}
