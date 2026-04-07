"use client";

import { useRedirectNonAuthUser } from "@/api/services/hooks.services";
import { useCart } from "@/app/_context/CartContext";
import { addProductToCart } from "@/app/cart/cart.actions";
import { Minus, Plus, ShoppingCart, Zap, Heart, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProductQuantityActions({
    price,
    quantityAvailable,
    productId,
}: {
    price: number;
    quantityAvailable: number;
    productId: string;
}) {
    const [quantity, setQuantity] = useState(1);
    const [loadingAddCart, setLoadingAddCart] = useState(false);
    const [loadingBuyNow, setLoadingBuyNow] = useState(false);
    const { updateCartIconCount } = useCart();
    const router = useRouter();
    const checkAuth = useRedirectNonAuthUser();

    const increase = () => {
        if (quantity < quantityAvailable) setQuantity((prev) => prev + 1);
    };

    const decrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddingToCart = async () => {
        if (!checkAuth()) return;
        setLoadingAddCart(true);
        try {
            for (let i = 0; i < quantity; i++) {
                await addProductToCart(productId);
            }
            await updateCartIconCount();
        } catch (e) {
            console.error("Failed to add to cart from product page", e);
        } finally {
            setLoadingAddCart(false);
        }
    };

    const handleBuyingNow = async () => {
        if (!checkAuth()) return;
        setLoadingBuyNow(true);
        try {
            for (let i = 0; i < quantity; i++) {
                await addProductToCart(productId);
            }
            await updateCartIconCount();
        } catch (e) {
            console.error("Failed to add to cart from product page", e);
        } finally {
            setLoadingBuyNow(false);
        }
        router.push("/cart");
    };
    return (
        <>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                </label>
                <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={decrease}
                            disabled={quantity <= 1}
                            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary transition disabled:opacity-50"
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="number"
                            min="1"
                            max={quantityAvailable}
                            value={quantity}
                            readOnly
                            className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                        />
                        <button
                            onClick={increase}
                            disabled={quantity >= quantityAvailable}
                            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary transition disabled:opacity-50"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <span className="text-sm text-gray-500">
                        {quantityAvailable} available
                    </span>
                </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">
                        {(price * quantity).toFixed(2)} EGP
                    </span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                    disabled={loadingAddCart}
                    onClick={handleAddingToCart}
                    className="cursor-pointer flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-primary-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 bg-primary"
                >
                    {loadingAddCart ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <ShoppingCart size={20} />
                            Add to Cart
                        </>
                    )}
                </button>
                <button
                    disabled={loadingBuyNow}
                    onClick={handleBuyingNow}
                    className="cursor-pointer flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    {loadingBuyNow ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Zap size={20} />
                            Buy Now
                        </>
                    )}
                </button>
            </div>
            <div className="flex gap-3 mb-6">
                <button className="cursor-pointer flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary-light hover:text-primary">
                    <Heart size={20} />
                    Add to Wishlist
                </button>
                <button className="cursor-pointer border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-light hover:text-primary transition flex items-center justify-center">
                    <Share2 size={20} />
                </button>
            </div>
        </>
    );
}
