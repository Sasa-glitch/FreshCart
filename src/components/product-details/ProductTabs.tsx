"use client";

import { Package, Star, Truck, Check } from "lucide-react";
import React, { useState } from "react";
import { SingleProductType } from "@/api/types";

export default function ProductTabs({ product }: { product: SingleProductType }) {
    const [activeTab, setActiveTab] = useState<"details" | "reviews" | "shipping">("details");

    const tabs = [
        { id: "details", label: "Product Details", icon: <Package size={16} /> },
        { id: "reviews", label: `Reviews (${product.reviews?.length || 0})`, icon: <Star size={16} /> },
        { id: "shipping", label: "Shipping & Returns", icon: <Truck size={16} /> },
    ] as const;

    return (
        <section id="product-details-tabs" className="py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "text-primary border-b-2 border-primary bg-primary-light/50"
                                            : "text-gray-600 hover:text-primary hover:bg-gray-50 bg-transparent border-b-2 border-transparent"
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-6">
                        {activeTab === "details" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Product</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-3">Product Information</h4>
                                        <ul className="space-y-2">
                                            <li className="flex justify-between text-sm">
                                                <span className="text-gray-500">Category</span>
                                                <span className="text-gray-900 font-medium">{product.category?.name}</span>
                                            </li>
                                            <li className="flex justify-between text-sm">
                                                <span className="text-gray-500">Subcategory</span>
                                                <span className="text-gray-900 font-medium">
                                                    {product.subcategory?.[0]?.name}
                                                </span>
                                            </li>
                                            <li className="flex justify-between text-sm">
                                                <span className="text-gray-500">Brand</span>
                                                <span className="text-gray-900 font-medium">{product.brand?.name}</span>
                                            </li>
                                            <li className="flex justify-between text-sm">
                                                <span className="text-gray-500">Items Sold</span>
                                                <span className="text-gray-900 font-medium">{product.sold}+ sold</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm text-gray-600">
                                                <Check className="text-primary mr-2" size={16} /> Premium Quality Product
                                            </li>
                                            <li className="flex items-center text-sm text-gray-600">
                                                <Check className="text-primary mr-2" size={16} /> 100% Authentic Guarantee
                                            </li>
                                            <li className="flex items-center text-sm text-gray-600">
                                                <Check className="text-primary mr-2" size={16} /> Fast & Secure Packaging
                                            </li>
                                            <li className="flex items-center text-sm text-gray-600">
                                                <Check className="text-primary mr-2" size={16} /> Quality Tested
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Reviews</h3>
                                {product.reviews?.length > 0 ? (
                                    <div className="space-y-4">
                                        {product.reviews.map((review) => (
                                            <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{review.user?.name}</span>
                                                    <div className="flex text-yellow-400">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm">{review.review}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No reviews yet.</p>
                                )}
                            </div>
                        )}
                        {activeTab === "shipping" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping & Returns Information</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    We offer fast and reliable shipping options. Orders over 500 EGP qualify for free delivery. 
                                    Returns are accepted within 30 days of purchase, provided the item is in its original condition.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 
