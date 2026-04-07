"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { addProductToCart } from "@/app/cart/cart.actions";
import { useCart } from "@/app/_context/CartContext";
import { useRedirectNonAuthUser } from "@/api/services/hooks.services";


export default function AddToCartButton({ id }: { id: string }) {
    const { updateCartIconCount } = useCart();
    const checkAuth = useRedirectNonAuthUser();
    const [isLoading, setIsLoading] = useState(false);

    // handle add item to cart function
    async function handleAddItemToCart() {
        if (isLoading) return;
        if (!checkAuth()) return;
        setIsLoading(true);
        try {
            await addProductToCart(id);
            await updateCartIconCount();
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setIsLoading(false);
        }
    } 
    return (
        <button
            onClick={handleAddItemToCart}
            disabled={isLoading}
            title="Add to Cart"
            type="button"
            className="w-9 h-9 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <FontAwesomeIcon icon={faPlus} className="w-3.5" />
            )}
        </button>
    );
}
