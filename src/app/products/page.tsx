import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProductsGrid from "../_components/ProductsGrid/ProductsGrid";
import Link from "next/link";
import { Brand, Category } from "@/api/types";

export interface apiResType {
    "data": {
        "_id": string,
        "name": string,
        "slug": string,
        "image": string,
        "createdAt": string,
        "updatedAt": string,
        "__v": number
    }
}

export default async function page({searchParams}: {searchParams: Promise<{brand: string, category: string}>}) {
    const BASE_URL = process.env.BASE_URL ?? "https://ecommerce.routemisr.com/api/";
    const theSearchParams = await searchParams
    const brandId = theSearchParams.brand;
    const categoryId = theSearchParams.category;
    const getBrand = async () => {
        try {
            const res = await fetch(`${BASE_URL}v1/brands/${brandId}`);
            const data: apiResType  = await res.json();
            return data.data;
        } catch (e) {
            console.error("Error from products page", e)
        }
    }
    const getCategory = async () => {
        try {
            const res = await fetch(`${BASE_URL}v1/categories/${categoryId}`);
            const data: apiResType  = await res.json();
            return data.data;
        } catch (e) {
            console.error("Error from products page", e);
        }
    }
    const brand: Brand | undefined = brandId ? await getBrand() : undefined;
    const category: Category | undefined = categoryId ? await getCategory() : undefined;
    const activeFilter = brand || category;
    return (
        <>
            {/* top area of products page */}
            <div className="bg-linear-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden relative">
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 py-10 sm:py-14 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
                        <Link
                            className="hover:text-white transition-colors"
                            href="/"
                        >
                            Home
                        </Link>
                        <span className="text-white/40">/</span>
                        {activeFilter ? (
                            <>
                                <Link
                                    className="hover:text-white transition-colors"
                                    href={activeFilter === brand ? "/brands" : "/categories"}
                                >
                                    Brands
                                </Link>
                                <span className="text-white/40">/</span>
                                <span className="text-white font-medium">
                                    {activeFilter.name}
                                </span>
                            </>
                        ) : (
                            <span className="text-white font-medium">
                                All Products
                            </span>
                        )}
                    </nav>

                    <div className="flex items-center gap-5 sm:gap-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 transition-transform hover:scale-105">
                            {activeFilter ? (
                                <img
                                    alt={activeFilter.name}
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                    src={activeFilter.image}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faBoxOpen}
                                    className="text-3xl sm:text-4xl"
                                />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                                {activeFilter ? activeFilter.name : "All Products"}
                            </h1>
                            <p className="text-white/80 mt-2 text-base sm:text-lg max-w-md">
                                {activeFilter
                                    ? `Shop ${activeFilter.name} products`
                                    : "Explore our complete product collection"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* products it self */}
            <ProductsGrid brand={brand} category={category}/>
        </>
    );
}
