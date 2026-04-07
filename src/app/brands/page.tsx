import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { Brand } from "@/api/types";
import BrandCard from "./_components/BrandCard";

export default async function BrandsPage() {
    async function getBrands(): Promise<Brand[] | undefined> {
        try {
            const res = await fetch(`${process.env.BASE_URL}v1/brands`, {
                cache: "force-cache", 
            });
            if (!res.ok) {
                throw new Error("Failed to fetch brands");
            }
            const data: { data: Brand[] } = await res.json();
            return data.data;
        } catch (e) {
            console.error("An error occurred while fetching brands:", e);
            return undefined;
        }
    }

    const brands = await getBrands();

    return (
        <div className="min-h-screen bg-mute-lightest/50">
            {/* Header Section */}
            <div className="bg-linear-to-br from-primary-dark via-primary to-primary-light text-white shadow-lg overflow-hidden relative">
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
                        <Link className="hover:text-white transition-colors" href="/">
                            Home
                        </Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Brands</span>
                    </nav>

                    <div className="flex items-center gap-5 sm:gap-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-1 ring-white/30 transition-transform hover:scale-105">
                            <FontAwesomeIcon icon={faTags} className="text-3xl sm:text-4xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                                Top Brands
                            </h1>
                            <p className="text-white/80 mt-2 text-base sm:text-lg max-w-md">
                                Explore and shop from our carefully curated list of high-quality brands.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brands Grid Section */}
            <div className="container mx-auto px-4 py-12">
                {!brands || brands.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-mute-light">
                        <div className="w-20 h-20 bg-mute-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                             <FontAwesomeIcon icon={faTags} className="text-3xl text-mute" />
                        </div>
                        <h2 className="text-xl font-semibold text-dark mb-2">No Brands Found</h2>
                        <p className="text-mute">We couldn't retrieve the brand list at the moment. Please try again later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {brands.map((brand) => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
