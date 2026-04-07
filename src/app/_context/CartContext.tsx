"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getUsersCart } from '@/app/cart/cart.actions';

interface CartContextType {
    cartCount: number;
    setCartCount: (count: number) => void;
    updateCartIconCount: () => Promise<void>;
    Atest: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartCount, setCartCount] = useState(0);
    const Atest = "aaa";

    const updateCartIconCount = async () => {
        try {
            const cart = await getUsersCart();
            if (!(cart instanceof Error) && cart.products) {
                setCartCount(cart.products.length);
            } else {
                setCartCount(0);
            }
        } catch (error) {
            console.error("Failed to fetch cart count", error);
        }
    };

    useEffect(() => {
        updateCartIconCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, updateCartIconCount, Atest }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
