import { callProducts } from "@/api/services/route.services";
import { Brand, ProductType, Category } from "@/api/types";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTags, faXmark, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function ProductsGrid({ brand, category }: { brand: Brand | undefined, category: Category | undefined }) {
    const products: ProductType[] | undefined = await callProducts();
    let productToShow = products;
    
    if (brand) {
        productToShow = products?.filter((product) => product.brand._id === brand._id);
    } else if (category) {
        productToShow = products?.filter((product) => product.category._id === category._id);
    }
    const activeFilter = brand || category;
    const productCount = productToShow?.length || 0;

    return (
        <section className="py-12 bg-mute-lightest/30 min-h-[60vh]">
            <div className="container mx-auto px-4">
                {/* Active Filters Bar */}
                {activeFilter && (
                    <div className="mb-8 flex items-center gap-3 flex-wrap animate-in fade-in slide-in-from-top-2 duration-500">
                        <span className="flex items-center gap-2 text-sm text-mute font-medium">
                            <FontAwesomeIcon icon={faFilter} className="text-xs" />
                            Active Filters:
                        </span>
                        <Link 
                            href="/products"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-all border border-primary/10 group"
                        >
                            <FontAwesomeIcon icon={faTags} className="text-xs opacity-70" />
                            {activeFilter.name}
                            <FontAwesomeIcon icon={faXmark} className="text-xs ml-1 group-hover:rotate-90 transition-transform" />
                        </Link>
                        <Link 
                            href="/products" 
                            className="text-sm text-mute hover:text-primary underline decoration-dotted underline-offset-4 transition-colors ml-2"
                        >
                            Clear all
                        </Link>
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-dark">
                        <span className="relative">
                            <span className="relative z-10">Products List</span>
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/10 -rotate-1"></span>
                        </span>
                    </h2>
                    <div className="text-sm font-medium text-mute bg-white px-4 py-2 rounded-xl shadow-sm border border-mute-light">
                        Showing <span className="text-primary font-bold">{productCount}</span> products
                    </div>
                </div>

                {productCount > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
                        {productToShow?.map((product: ProductType) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                imageCover={product.imageCover}
                                category={product.category.name}
                                price={product.price}
                                priceAfterDiscount={product.priceAfterDiscount}
                                ratingsAverage={product.ratingsAverage}
                                ratingsQuantity={product.ratingsQuantity}
                            />
                        ))}
                    </div>
                ) : (
                    /* No Products Found Empty State */
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-mute-light shadow-sm animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 rounded-full bg-mute-lightest flex items-center justify-center mx-auto mb-6 ring-8 ring-mute-lightest/50">
                            <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-mute/40" />
                        </div>
                        <h3 className="text-2xl font-bold text-dark mb-3">No Products Found</h3>
                        <p className="text-mute max-w-md mx-auto mb-8 text-lg">
                            We couldn't find any products matching your current filters. Try choosing a different brand or clearing your filters.
                        </p>
                        <Link 
                            href="/products" 
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
                        >
                            View All Products
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
