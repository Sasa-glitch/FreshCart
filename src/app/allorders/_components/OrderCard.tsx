"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faHashtag,
    faCreditCard,
    faMoneyBill,
    faTruck,
    faCalendarDays,
    faBox,
    faLocationDot,
    faChevronDown,
    faReceipt,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { CashOrderData } from "@/api/types";

export default function OrderCard({ order }: { order: CashOrderData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const firstItem = order.cartItems[0];
    const totalItemsCount = order.cartItems.reduce(
        (acc, curr) => acc + curr.count,
        0,
    );
    const extraUniqueItems = order.cartItems.length - 1;

    const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const isPaid = order.isPaid;
    // Calculate subtotal to check shipping fee logic roughly
    const subtotal = order.cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0);
    const shippingFeeStr = order.totalOrderPrice > subtotal ? `${order.totalOrderPrice - subtotal} EGP` : "Free";

    return (
        <div
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
            }`}
        >
            <div className="p-5 sm:p-6">
                <div className="flex gap-5">
                    <div className="relative shrink-0">
                        {firstItem && (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
                                <img
                                    alt={firstItem.product.title}
                                    className="w-full h-full object-contain"
                                    src={firstItem.product.imageCover}
                                />
                            </div>
                        )}
                        {extraUniqueItems > 0 && (
                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                                +{extraUniqueItems}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                                {/* Status Badge */}
                                {order.paymentMethodType === "card" && isPaid ? (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-lg mb-2">
                                        <FontAwesomeIcon
                                            icon={faTruck}
                                            className="text-xs text-blue-600"
                                        />
                                        <span className="text-xs font-semibold text-blue-600">
                                            On the way
                                        </span>
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="text-xs text-amber-600"
                                        />
                                        <span className="text-xs font-semibold text-amber-600">
                                            Processing
                                        </span>
                                    </div>
                                )}

                                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                    <FontAwesomeIcon
                                        icon={faHashtag}
                                        className="text-xs text-gray-400"
                                    />
                                    {order.id}
                                </h3>
                            </div>

                            {/* Payment Method Icon */}
                            <div
                                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${order.paymentMethodType === "card" ? "bg-purple-100" : "bg-gray-100"}`}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        order.paymentMethodType === "card"
                                            ? faCreditCard
                                            : faMoneyBill
                                    }
                                    className={
                                        order.paymentMethodType === "card"
                                            ? "text-purple-600"
                                            : "text-gray-600"
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="text-xs text-gray-400"
                                />
                                {orderDate}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon
                                    icon={faBox}
                                    className="text-xs text-gray-400"
                                />
                                {totalItemsCount} item
                                {totalItemsCount !== 1 && "s"}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="text-xs text-gray-400"
                                />
                                {order.shippingAddress?.city}
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <span className="text-2xl font-bold text-gray-900">
                                    {order.totalOrderPrice}
                                </span>
                                <span className="text-sm font-medium text-gray-400 ml-1">
                                    EGP
                                </span>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    isExpanded
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {isExpanded ? "Hide" : "Details"}
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`text-xs transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50">
                    <div className="p-5 sm:p-6">
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faReceipt} className="text-xs text-primary" />
                            </div>
                            Order Items
                        </h4>
                        <div className="space-y-3">
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                                    <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                                        <img alt={item.product.title} className="w-full h-full object-contain" src={item.product.imageCover} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            <span className="font-medium text-gray-700">{item.count}</span> &times; {item.price} EGP
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-lg font-bold text-gray-900">{item.count * item.price}</p>
                                        <p className="text-xs text-gray-400">EGP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-xs text-blue-600" />
                                </div>
                                Delivery Address
                            </h4>
                            <div className="space-y-2">
                                <p className="font-medium text-gray-900">{order.shippingAddress?.city || "N/A"}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{order.shippingAddress?.details || "No details provided"}</p>
                                {order.shippingAddress?.phone && (
                                    <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                                        <FontAwesomeIcon icon={faPhone} className="text-xs text-gray-400" />
                                        {order.shippingAddress.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faClock} className="text-xs text-white" />
                                </div>
                                Order Summary
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{subtotal} EGP</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">{shippingFeeStr}</span>
                                </div>
                                <hr className="border-gray-200/50 my-2" />
                                <div className="flex justify-between pt-1">
                                    <span className="font-semibold text-gray-900">Total</span>
                                    <span className="font-bold text-lg text-gray-900">{order.totalOrderPrice} EGP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
