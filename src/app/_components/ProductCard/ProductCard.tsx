import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faPlus,
    faArrowsRotate,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "../StarRating/StarRating";
import { lazy } from 'react';
import AddToCartButton from "../AddToCartButton/AddToCartButton";

interface ProductCardProps {
    id: string;
    title: string;
    imageCover: string;
    category: string;
    price: number;
    priceAfterDiscount?: number;
    ratingsAverage: number;
    ratingsQuantity: number;
}

export default function ProductCard({
    id,
    title,
    imageCover,
    category,
    price,
    priceAfterDiscount,
    ratingsAverage,
    ratingsQuantity,
}: ProductCardProps) {
    const discount = priceAfterDiscount
        ? Math.round(((price - priceAfterDiscount) / price) * 100)
        : 0;

    

    return (
        <div className="group bg-white rounded-xl border border-mute-light hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden">
            {/* Image section */}
            <div className="relative aspect-square overflow-hidden bg-mute-lightest">
                <Link href={`/products/${id}`} className="block relative w-full h-full">
                    <Image
                        loading="lazy"
                        src={imageCover}
                        alt={title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </Link>

                {/* Discount badge */}
                {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-discount text-white text-xs font-bold px-2.5 py-1 rounded-md">
                        -{discount}%
                    </span>
                )}

                {/* Action icons (appear on hover) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <button
                        title="Add to Wishlist"
                        className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-mute hover:text-primary hover:shadow-lg transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faHeart} className="w-3.5" />
                    </button>
                    <button
                        title="Compare"
                        className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-mute hover:text-primary hover:shadow-lg transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon
                            icon={faArrowsRotate}
                            className="w-3.5"
                        />
                    </button>
                    <Link
                        href={`/products/${id}`}
                        title="Quick View"
                        className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-mute hover:text-primary hover:shadow-lg transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faEye} className="w-3.5" />
                    </Link>
                </div>
            </div>

            {/* Info section */}
            <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">
                    {category}
                </p>
                <Link href={`/products/${id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors mb-2 min-h-10">
                        {title}
                    </h3>
                </Link>
                <StarRating
                    rating={ratingsAverage}
                    count={ratingsQuantity}
                    size="sm"
                />
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                        <span
                            className={`font-bold text-base ${priceAfterDiscount ? "text-primary" : "text-gray-900"}`}
                        >
                            {priceAfterDiscount || price} EGP
                        </span>
                        {priceAfterDiscount && (
                            <span className="text-xs text-mute line-through">
                                {price} EGP
                            </span>
                        )}
                    </div>
                    <AddToCartButton id={id} />
                </div>
            </div>
        </div>
    );
}
