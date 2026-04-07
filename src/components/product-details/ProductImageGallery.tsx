"use client";

import React, { useState } from "react";

export default function ProductImageGallery({ images }: { images: string[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div id="product-images" className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-gray-100 flex items-center justify-center p-2">
                        <img 
                            src={images[activeIndex] || images[0]} 
                            alt="Product Image" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((image, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setActiveIndex(idx)}
                                className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                                    activeIndex === idx 
                                    ? "border-primary-600" 
                                    : "border-transparent hover:border-primary-300"
                                }`}
                            >
                                <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 
