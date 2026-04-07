"use client";

import React, { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faReceipt,
    faArrowLeft,
    faHouse,
    faCircleInfo,
    faCity,
    faLocationDot,
    faPhone,
    faWallet,
    faMoneyBill,
    faCreditCard,
    faCheck,
    faShieldHalved,
    faBagShopping,
    faTruck,
    faBox,
} from "@fortawesome/free-solid-svg-icons";
import { CartData } from "@/api/types";
import { payWithCash, payWithCard } from "../checkout.actions";
import { toast } from "sonner"; // for notifications if installed, else simple alert
import { useCart } from "@/app/_context/CartContext";

const checkoutSchema = z.object({
    city: z
        .string()
        .min(1, "City is required")
        .max(50, "City must be less than 50 characters"),
    details: z
        .string()
        .min(1, "Street address is required")
        .max(2000, "Details must be less than 2000 characters"),
    phone: z
        .string()
        .regex(
            /^(\+2)?01[0125][0-9]{8}$/,
            "Must be a valid Egyptian phone number",
        ),
    postalCode: z
        .string()
        .max(50, "Postal code must be less than 50 characters")
        .optional()
        .or(z.literal("")),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
    cartData: CartData;
    cartId: string;
}

export default function CheckoutForm({ cartData, cartId }: CheckoutFormProps) {
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { updateCartIconCount } = useCart();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            city: "",
            details: "",
            phone: "",
            postalCode: "",
        },
    });

    const onSubmit = (data: CheckoutFormValues) => {
        startTransition(async () => {
            if (paymentMethod === "cash") {
                const orderDetails = {
                    shippingAddress: {
                        city: data.city,
                        details: data.details,
                        phone: data.phone,
                        postalCode: data.postalCode || undefined,
                    },
                };
                const res = await payWithCash(cartId, orderDetails);
                await updateCartIconCount();
                
                if (res instanceof Error) {
                    toast.error(res.message || "Something went wrong.");
                } else if (
                    (res && res.status === "success") ||
                    (res as any).message === "success"
                ) {
                    toast.success("Order placed successfully!");
                    router.push("/allorders");
                }
            } else if (paymentMethod === "card") {
                const orderDetails = {
                    shippingAddress: {
                        city: data.city,
                        details: data.details,
                        phone: data.phone,
                        // postalCode explicitly excluded per requirements
                    },
                };
                const res = await payWithCard(cartId, orderDetails);
                if (res instanceof Error) {
                    toast.error(res.message || "Something went wrong.");
                } else if (res && res.session?.url) {
                    toast.loading("Redirecting to Stripe...");
                    await updateCartIconCount();
                    window.location.href = res.session.url;
                }
            }
        });
    };

    const shippingFee = cartData.totalCartPrice >= 500 ? 0 : 50;

    return (
        <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs & Header */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link
                            className="hover:text-primary-dark transition"
                            href="/"
                        >
                            Home
                        </Link>
                        <span className="text-gray-300">/</span>
                        <Link
                            className="hover:text-primary-dark transition"
                            href="/cart"
                        >
                            Cart
                        </Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-medium">
                            Checkout
                        </span>
                    </nav>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                    <FontAwesomeIcon icon={faReceipt} />
                                </span>
                                Complete Your Order
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Review your items and complete your purchase
                            </p>
                        </div>
                        <Link
                            href="/cart"
                            className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Back to Cart
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form Fields */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Address Section */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <div className="bg-primary px-6 py-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <FontAwesomeIcon icon={faHouse} />
                                        Shipping Address
                                    </h2>
                                    <p className="text-green-100 text-sm mt-1">
                                        Where should we deliver your order?
                                    </p>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <FontAwesomeIcon
                                                icon={faCircleInfo}
                                                className="text-blue-600 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-800 font-medium">
                                                Delivery Information
                                            </p>
                                            <p className="text-xs text-blue-600 mt-0.5">
                                                Please ensure your address is
                                                accurate for smooth delivery
                                            </p>
                                        </div>
                                    </div>

                                    {/* City Input */}
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            City{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faCity}
                                                    className="text-gray-500 text-sm"
                                                />
                                            </div>
                                            <input
                                                id="city"
                                                className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all ${
                                                    errors.city
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                        : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                }`}
                                                placeholder="e.g. Cairo, Alexandria, Giza"
                                                type="text"
                                                {...register("city")}
                                            />
                                        </div>
                                        {errors.city && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.city.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Street Address Input */}
                                    <div>
                                        <label
                                            htmlFor="details"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Street Address{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className="text-gray-500 text-sm"
                                                />
                                            </div>
                                            <textarea
                                                id="details"
                                                rows={3}
                                                className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none ${
                                                    errors.details
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                        : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                }`}
                                                placeholder="Street name, building number, floor, apartment..."
                                                {...register("details")}
                                            />
                                        </div>
                                        {errors.details && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.details.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number Input */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Phone Number{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    className="text-gray-500 text-sm"
                                                />
                                            </div>
                                            <input
                                                id="phone"
                                                className={`w-full px-4 py-3.5 pl-14 pr-32 border-2 rounded-xl focus:outline-none transition-all ${
                                                    errors.phone
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                        : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                }`}
                                                placeholder="01xxxxxxxxx"
                                                type="tel"
                                                {...register("phone")}
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                                                Egyptian numbers only
                                            </span>
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Postal Code Input (Optional) */}
                                    <div>
                                        <label
                                            htmlFor="postalCode"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Postal Code{" "}
                                            <span className="text-gray-400 font-normal">
                                                (Optional)
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="postalCode"
                                                className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all ${
                                                    errors.postalCode
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                        : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                }`}
                                                placeholder="e.g. 11728"
                                                type="text"
                                                {...register("postalCode")}
                                            />
                                        </div>
                                        {errors.postalCode && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.postalCode.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Section */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <div className="bg-primary px-6 py-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <FontAwesomeIcon icon={faWallet} />
                                        Payment Method
                                    </h2>
                                    <p className="text-green-100 text-sm mt-1">
                                        Choose how you'd like to pay
                                    </p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("cash")}
                                        className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                                            paymentMethod === "cash"
                                                ? "border-primary bg-green-50 shadow-sm"
                                                : "border-gray-200 hover:border-primary-light hover:bg-gray-50"
                                        }`}
                                    >
                                        <div
                                            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                                paymentMethod === "cash"
                                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                            }`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMoneyBill}
                                                className="text-xl"
                                            />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3
                                                className={`font-bold ${paymentMethod === "cash" ? "text-primary-dark" : "text-gray-900"}`}
                                            >
                                                Cash on Delivery
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                Pay when your order arrives at
                                                your doorstep
                                            </p>
                                        </div>
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                                paymentMethod === "cash"
                                                    ? "bg-primary text-white"
                                                    : "border-2 border-gray-200"
                                            }`}
                                        >
                                            {paymentMethod === "cash" && (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-xs"
                                                />
                                            )}
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("card")}
                                        className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                                            paymentMethod === "card"
                                                ? "border-primary bg-green-50 shadow-sm"
                                                : "border-gray-200 hover:border-primary-light hover:bg-gray-50"
                                        }`}
                                    >
                                        <div
                                            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                                paymentMethod === "card"
                                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                            }`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCreditCard}
                                                className="text-xl"
                                            />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3
                                                className={`font-bold ${paymentMethod === "card" ? "text-primary-dark" : "text-gray-900"}`}
                                            >
                                                Pay Online
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                Secure payment with Credit/Debit
                                                Card via Stripe
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <img
                                                    alt="Visa"
                                                    className="h-5"
                                                    src="https://img.icons8.com/color/48/visa.png"
                                                />
                                                <img
                                                    alt="Mastercard"
                                                    className="h-5"
                                                    src="https://img.icons8.com/color/48/mastercard.png"
                                                />
                                                <img
                                                    alt="Amex"
                                                    className="h-5"
                                                    src="https://img.icons8.com/color/48/amex.png"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                                paymentMethod === "card"
                                                    ? "bg-primary text-white"
                                                    : "border-2 border-gray-200"
                                            }`}
                                        >
                                            {paymentMethod === "card" && (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-xs"
                                                />
                                            )}
                                        </div>
                                    </button>

                                    <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <FontAwesomeIcon
                                                icon={faShieldHalved}
                                                className="text-green-600"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-green-800">
                                                Secure & Encrypted
                                            </p>
                                            <p className="text-xs text-green-600 mt-0.5">
                                                Your payment info is protected
                                                with 256-bit SSL encryption
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary & Submit section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                                <div className="bg-primary px-6 py-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBagShopping} />
                                        Order Summary
                                    </h2>
                                    <p className="text-green-100 text-sm mt-1">
                                        {cartData.products.length} items
                                    </p>
                                </div>
                                <div className="p-5">
                                    <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                                        {cartData.products.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                                                    <img
                                                        alt={item.product.title}
                                                        className="w-full h-full object-contain"
                                                        src={
                                                            item.product
                                                                .imageCover
                                                        }
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {item.product.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {item.count} ×{" "}
                                                        {item.price} EGP
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 shrink-0">
                                                    {item.count * item.price}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="border-gray-100 my-4" />
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">
                                                {cartData.totalCartPrice} EGP
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span className="flex items-center gap-2">
                                                <FontAwesomeIcon
                                                    icon={faTruck}
                                                    className="text-gray-400"
                                                />
                                                Shipping
                                            </span>
                                            {shippingFee === 0 ? (
                                                <span className="text-green-600 font-semibold">
                                                    FREE
                                                </span>
                                            ) : (
                                                <span className="font-semibold">
                                                    {shippingFee} EGP
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <hr className="border-gray-100 my-4" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">
                                            Total
                                        </span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-primary">
                                                {cartData.totalCartPrice +
                                                    shippingFee}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-1">
                                                EGP
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
                                    >
                                        <FontAwesomeIcon
                                            icon={faShieldHalved}
                                        />
                                        {isPending
                                            ? "Processing..."
                                            : "Proceed to Payment"}
                                    </button>
                                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <FontAwesomeIcon
                                                icon={faShieldHalved}
                                                className="text-green-500"
                                            />
                                            <span>Secure</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-200"></div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <FontAwesomeIcon
                                                icon={faTruck}
                                                className="text-blue-500"
                                            />
                                            <span>Fast Delivery</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-200"></div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <FontAwesomeIcon
                                                icon={faBox}
                                                className="text-orange-500"
                                            />
                                            <span>Easy Returns</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
