import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { getUserOrders } from "./allorders.actions";
import { CashOrderData } from "@/api/types";
import OrderCard from "./_components/OrderCard";

export default async function AllOrdersPage() {
    const ordersRes = await getUserOrders();

    if (ordersRes instanceof Error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-red-500">
                {ordersRes.message}
            </div>
        );
    }

    const orders: CashOrderData[] = ordersRes || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link
                        className="hover:text-primary-dark transition"
                        href="/"
                    >
                        Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-medium">My Orders</span>
                </nav>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                            <FontAwesomeIcon
                                icon={faBox}
                                className="text-2xl text-white"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                My Orders
                            </h1>
                            <p className="text-gray-500 text-sm mt-0.5">
                                Track and manage your {orders.length} orders
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="self-start sm:self-auto text-primary hover:text-primary-dark font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm"
                    >
                        <FontAwesomeIcon
                            icon={faBagShopping}
                            className="text-xs"
                        />
                        Continue Shopping
                    </Link>
                </div>
            </div>

            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500">You have no orders yet.</p>
                    </div>
                ) : (
                    orders.reverse().map((order) => {
                        return <OrderCard order={order} key={order._id} />
                    })
                )}
            </div>
        </div>
    );
}

