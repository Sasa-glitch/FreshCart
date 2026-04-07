"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Brand } from "@/api/types";

interface BrandCardProps {
    brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
    return (
        <Link
            href={`/products?brand=${brand._id}`}
            className="group bg-white rounded-2xl border border-mute-light p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-primary-light transition-all duration-300 hover:-translate-y-1 block"
        >
            <div className="aspect-square rounded-xl overflow-hidden bg-mute-lightest mb-3 p-4 flex items-center justify-center">
                <img
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    src={brand.image}
                    loading="lazy"
                />
            </div>
            <h3 className="font-semibold text-dark text-center text-sm group-hover:text-primary transition-colors truncate">
                {brand.name}
            </h3>
            <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] sm:text-xs font-medium text-primary flex items-center gap-1.5 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                    View Products
                    <FontAwesomeIcon icon={faArrowRight} className="text-[8px] sm:text-[10px]" />
                </span>
            </div>
        </Link>
    );
}
