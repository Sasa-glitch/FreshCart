"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Apple,
    Carrot,
    Citrus,
    Sprout,
    ShoppingCart,
    House,
    ArrowLeft,
} from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-mute-lightest flex items-center justify-center px-4 py-16 relative overflow-hidden">
            {/* Floating Background Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] text-primary/30 text-4xl animate-[float_6s_ease-in-out_infinite]">
                    <Apple size={48} />
                </div>
                <div className="absolute top-[20%] right-[10%] text-primary/30 text-3xl animate-[float_8s_ease-in-out_infinite_1s]">
                    <Carrot size={40} />
                </div>
                <div className="absolute bottom-[25%] left-[8%] text-primary/30 text-3xl animate-[float_7s_ease-in-out_infinite_0.5s]">
                    <Citrus size={40} />
                </div>
                <div className="absolute bottom-[15%] right-[15%] text-primary/30 text-4xl animate-[float_9s_ease-in-out_infinite_2s]">
                    <Sprout size={48} />
                </div>
                <div className="absolute top-[50%] left-[15%] text-primary/20 text-2xl animate-[float_5s_ease-in-out_infinite_1.5s]">
                    <Apple size={32} />
                </div>
                <div className="absolute top-[40%] right-[5%] text-primary/20 text-2xl animate-[float_6s_ease-in-out_infinite_0.8s]">
                    <Carrot size={32} />
                </div>

                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-xl w-full">
                {/* Visual Header */}
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        {/* Shadow Glow */}
                        <div className="absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-primary/10 rounded-4xl blur-2xl" />

                        <div className="relative w-64 h-52 sm:w-72 sm:h-60">
                            {/* Card with Cart Icon */}
                            <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-mute-light/60 border border-mute-light flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />
                                <ShoppingCart className="relative text-primary/60" size={80} />
                            </div>

                            {/* 404 Badge */}
                            <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                                <div className="relative">
                                    <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />
                                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/40">
                                        <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                            404
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Smile effect at bottom */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-light" />
                                <div className="w-8 h-4 border-b-[3px] border-primary-light rounded-b-full" />
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-light" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-black text-dark mb-4 tracking-tight">
                        Oops! Nothing Here
                    </h1>
                    <p className="text-mute text-lg leading-relaxed max-w-md mx-auto">
                        Looks like this page went out of stock! Don't worry,
                        there's plenty more fresh content to explore.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
                        href="/"
                    >
                        <House className="group-hover:scale-110 transition-transform duration-300" />
                        Go to Homepage
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-mute-lightest text-dark py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-mute-light hover:-translate-y-1 cursor-pointer"
                    >
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Go Back
                    </button>
                </div>

                {/* Popular Destinations */}
                <div className="bg-white rounded-3xl border border-mute-light shadow-sm p-6">
                    <p className="text-center text-sm font-medium text-mute uppercase tracking-wider mb-4">
                        Popular Destinations
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
                            href="/products"
                        >
                            All Products
                        </Link>
                        <Link
                            className="px-5 py-2.5 rounded-xl bg-mute-lighter text-dark font-semibold text-sm hover:bg-mute-light transition-colors"
                            href="/categories"
                        >
                            Categories
                        </Link>
                        <Link
                            className="px-5 py-2.5 rounded-xl bg-mute-lighter text-dark font-semibold text-sm hover:bg-mute-light transition-colors"
                            href="/deals"
                        >
                            Today's Deals
                        </Link>
                        <Link
                            className="px-5 py-2.5 rounded-xl bg-mute-lighter text-dark font-semibold text-sm hover:bg-mute-light transition-colors"
                            href="/contact"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
