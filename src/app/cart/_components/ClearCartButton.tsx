"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { clearCart } from '../cart.actions';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/_context/CartContext';

export default function ClearCartButton() {
    const router = useRouter();
    const { updateCartIconCount } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await clearCart();
            await updateCartIconCount();
            router.refresh();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
        >
            {isLoading ? (
                <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <FontAwesomeIcon icon={faTrash} className="text-xs group-hover:scale-110 transition-transform" />
            )}
            <span>Clear all items</span>
        </button>
    );
}
