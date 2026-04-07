"use server";

import { CardOrderResType, CashOrderDetails, CashOrderResType, ShippingAddress } from "@/api/types";
import { getDecodedToken } from "../utiles";

export async function payWithCash(id: string, orderDetails:CashOrderDetails): Promise<CashOrderResType|undefined|Error> {
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            const res = await fetch(`${process.env.BASE_URL}v2/orders/${id}`, {
                method: "post",
                headers: {
                    token: userToken,
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderDetails),
            });
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("an error happened with paying in cash",e);
        }
    } 
    else {
        return new Error("Session ended please login again!");
    }
}

export async function payWithCard(id: string, orderDetails:{shippingAddress: ShippingAddress}): Promise<CardOrderResType|undefined|Error> {
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            const res = await fetch(`${process.env.BASE_URL}v1/orders/checkout-session/${id}?url=http://localhost:3000`, {
                method: "post",
                headers: {
                    token: userToken,
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderDetails),
            });
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("an error happened with paying in cash",e);
        }
    } 
    else {
        return new Error("Session ended please login again!");
    }
}