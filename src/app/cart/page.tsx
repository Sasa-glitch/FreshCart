import React from "react";
import { getUsersCart } from "./cart.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./_components/CartItem";
import CartSummary from "./_components/CartSummary";
import ClearCartButton from "./_components/ClearCartButton";
import Link from "next/link";

export default async function CartPage() {
    const usersCart = await getUsersCart();
    console.log("This is users cart hereee",usersCart);

    // Check if error or empty
    if (
        usersCart instanceof Error ||
        !usersCart ||
        !usersCart.products ||
        usersCart.products.length === 0
    ) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link
                                className="hover:text-primary-600 transition"
                                href="/"
                            >
                                Home
                            </Link>
                            <span className="px-2">/</span>
                            <span className="text-gray-900 font-medium">
                                Shopping Cart
                            </span>
                        </nav>
                    </div>
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="text-4xl"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Looks like you haven't added anything to your cart
                            yet.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const { products, totalCartPrice } = usersCart;
    const shippingFee = totalCartPrice >= 500 ? 0 : 50;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link
                            className="hover:text-primary-600 transition"
                            href="/"
                        >
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">
                            Shopping Cart
                        </span>
                    </nav>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className="text-xl"
                                    />
                                </span>
                                Shopping Cart
                            </h1>
                            <p className="text-gray-500 mt-2">
                                You have{" "}
                                <span className="font-semibold text-primary-600">
                                    {products.length} items
                                </span>{" "}
                                in your cart
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {products.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Footer Controls */}
                        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                            <Link
                                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
                                href="/"
                            >
                                <span>&larr;</span> Continue Shopping
                            </Link>
                            <ClearCartButton />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <CartSummary
                            totalCartPrice={totalCartPrice}
                            productsCount={products.length}
                            shippingFee={shippingFee}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
