import React from 'react';
import { getUsersCart } from '../cart/cart.actions';
import { redirect } from 'next/navigation';
import CheckoutForm from './_components/CheckoutForm';

export default async function CheckoutPage() {
    const cartData = await getUsersCart();
    
    if (cartData instanceof Error || !cartData || !cartData.products || cartData.products.length === 0) {
        // If there's an error or no cart items, redirect back to cart
        redirect('/cart');
    }

    return (
        <CheckoutForm cartData={cartData} cartId={cartData._id!} />
    );
}
