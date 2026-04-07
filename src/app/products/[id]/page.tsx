import { SingleProductType } from "@/api/types";
import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Star, StarHalf } from "lucide-react";
import ProductImageGallery from "@/components/product-details/ProductImageGallery";
import ProductQuantityActions from "@/components/product-details/ProductQuantityActions";
import ProductTabs from "@/components/product-details/ProductTabs";

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    async function getSingleProduct(
        id: string,
    ): Promise<SingleProductType | undefined> {
        try {
            const res = await fetch(
                `${process.env.BASE_URL}v1/products/${id}`,
            );
            if (!res.ok) {
                throw new Error("Unexpected error happened");
            }
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const product = await getSingleProduct(id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
                <Link href="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <main>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="py-4">
                <div className="container mx-auto px-4">
                    <ol className="flex items-center flex-wrap gap-1 text-sm">
                        <li className="flex items-center">
                            <Link className="text-gray-500 hover:text-primary transition flex items-center gap-1.5" href="/">
                                <Home size={14} /> Home
                            </Link>
                            <ChevronRight size={12} className="text-gray-400 mx-2" />
                        </li>
                        {product.category && (
                            <li className="flex items-center">
                                <Link className="text-gray-500 hover:text-primary transition flex items-center gap-1.5" href={`/categories/${product.category._id}`}>
                                    {product.category.name}
                                </Link>
                                <ChevronRight size={12} className="text-gray-400 mx-2" />
                            </li>
                        )}
                        {product.subcategory?.[0] && (
                            <li className="flex items-center">
                                <Link className="text-gray-500 hover:text-primary transition flex items-center gap-1.5" href={`/categories/${product.category?._id}/${product.subcategory[0]._id}`}>
                                    {product.subcategory[0].name}
                                </Link>
                                <ChevronRight size={12} className="text-gray-400 mx-2" />
                            </li>
                        )}
                        <li className="text-gray-900 font-medium truncate max-w-xs">{product.title}</li>
                    </ol>
                </div>
            </nav>

            {/* Main Product Info Section */}
            <section id="product-detail" className="py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Interactive Image Gallery */}
                        <ProductImageGallery images={product.images} />

                        {/* Product Info */}
                        <div id="product-info" className="lg:w-3/4">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link className="bg-primary-light text-primary-dark text-xs px-3 py-1.5 rounded-full hover:bg-primary-light transition" href={`/categories/${product.category?._id}`}>
                                        {product.category?.name}
                                    </Link>
                                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                                        {product.brand?.name}
                                    </span>
                                </div>

                                {/* Title and Reviews */}
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < Math.floor(product.ratingsAverage || 0) ? "currentColor" : "none"}
                                                className={i < Math.floor(product.ratingsAverage || 0) ? "text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">{product.ratingsAverage} ({product.ratingsQuantity || product.reviews?.length || 0} reviews)</span>
                                </div>

                                {/* Current Price */}
                                <div className="flex items-center flex-wrap gap-3 mb-6">
                                    <span className="text-3xl font-bold text-gray-900">{product.price} EGP</span>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        In Stock
                                    </span>
                                </div>

                                {/* Description Preview */}
                                <div className="border-t border-gray-100 pt-5 mb-6">
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm lg:text-base">
                                        {product.description?.length > 150 ? product.description.substring(0, 150) + "..." : product.description}
                                    </p>
                                </div>

                                {/* Interactive Quantity and Buy Actions */}
                                <ProductQuantityActions price={product.price} quantityAvailable={product.quantity} productId={product._id} />

                                {/* Features List */}
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">Free Delivery</h4>
                                                <p className="text-xs text-gray-500">Orders over 500 EGP</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">30 Days Return</h4>
                                                <p className="text-xs text-gray-500">Money back</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">Secure Payment</h4>
                                                <p className="text-xs text-gray-500">100% Protected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Tabs Section */}
            <ProductTabs product={product} />

            {/* You May Also Like placeholder could go here */}
        </main>
    );
}
