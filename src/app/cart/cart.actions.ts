"use server";

import { getDecodedToken } from "../utiles";
import { CartData, CartResponse } from "@/api/types";
import { BASE_URL } from "@/lib/config";

export async function addProductToCart(id: string) {
    // console.log("add to cart function fire")
    const userToken = await getDecodedToken();
    // console.log("This is the token", userToken)
    if (userToken) {
        try {
            const res = await fetch(`${BASE_URL}v2/cart`, {
                method: "Post",
                body: JSON.stringify({ productId: id }),
                headers: {
                    token: userToken,
                    "content-type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("unexpected error");
            }
            const fRes = await res.json();
            console.log(
                "adding item to cart final response",
                JSON.stringify(fRes, null, 2),
            );
        } catch (e) {
            console.error("error in adding item to cart", e);
        }
    } else {
        // console.log("Error happen while adding to cart")
        return new Error("Session ended please login again!");
    }
}

export async function getUsersCart(): Promise<CartData | Error> {
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            const res = await fetch(`${BASE_URL}v2/cart`, {
                method: "get",
                headers: {
                    token: userToken,
                    "content-type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("unexpected error");
            }
            const fRes: CartResponse = await res.json();
            console.log(fRes);
            return fRes.data;
        } catch (e) {
            console.error("error in adding item to cart", e);
            return new Error("Error happened with getting cart items!");
        }
    } else {
        return new Error("Session ended please login again!");
    }
}

export async function updateCartItemNumber(itemId: string, newNumber: string): Promise<CartData | Error> {
    // note that itemId is the id of the product that is inside prdoucts like if we want to get the id of the first item it will be   fRes.data.products[0]._id
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            const res = await fetch(
                `${BASE_URL}v2/cart/${itemId}`,
                {
                    method: "put",
                    headers: {
                        token: userToken,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ count: newNumber }),
                },
            );
            if (!res.ok) {
                throw new Error("unexpected error");
            }
            const fRes: CartResponse = await res.json();
            console.log(fRes);
            return fRes.data;
        } catch (e) {
            console.error("error in adding item to cart", e);
            return new Error("Error happened with getting cart items!");
        }
    } else {
        return new Error("Session ended please login again!");
    }
}

export async function deleteItemFromCart(itemId: string): Promise<CartData | Error> {
    // note that itemId is the id of the product that is inside prdoucts like if we want to get the id of the first item it will be   fRes.data.products[0]._id
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            const res = await fetch(
                `${BASE_URL}v2/cart/${itemId}`,
                {
                    method: "delete",
                    headers: {
                        token: userToken,
                        "content-type": "application/json",
                    },
                },
            );
            if (!res.ok) {
                throw new Error("unexpected error");
            }
            const fRes: CartResponse = await res.json();
            console.log(fRes);
            return fRes.data;
        } catch (e) {
            console.error("error in adding item to cart", e);
            return new Error("Error happened with getting cart items!");
        }
    } else {
        return new Error("Session ended please login again!");
    }
}

export async function clearCart(): Promise<CartData | Error> {
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            const res = await fetch(
                `${BASE_URL}v2/cart/`,
                {
                    method: "delete",
                    headers: {
                        token: userToken,
                        "content-type": "application/json",
                    },
                },
            );
            if (!res.ok) {
                throw new Error("unexpected error");
            }
            const fRes: CartResponse = await res.json();
            console.log(fRes);
            return fRes.data;
        } catch (e) {
            console.error("error in adding item to cart", e);
            return new Error("Error happened with getting cart items!");
        }
    } else {
        return new Error("Session ended please login again!");
    }
}
