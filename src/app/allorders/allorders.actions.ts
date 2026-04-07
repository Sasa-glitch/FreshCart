import { getDecodedToken } from "../utiles";
import { jwtDecode } from "jwt-decode";
import { CashOrderData } from "@/api/types"; // using the existing type
export async function getUserOrders(): Promise<CashOrderData[] | Error> {
    const userToken = await getDecodedToken();
    if (userToken) {
        try {
            // Extact id using jwtDecode
            const { id } = jwtDecode<{ id: string }>(userToken);

            const res = await fetch(`${process.env.BASE_URL}v1/orders/user/${id}`, {
                method: "get",
                headers: {
                    token: userToken,
                    "content-type": "application/json"
                },
            });
            
            if (!res.ok) {
                return new Error("Failed to fetch user orders.");
            }
            const data = await res.json();
            return data as CashOrderData[];
        } catch (e) {
            console.error("error happened while fetching orders", e);
            return new Error("Failed to fetch orders.");
        }
    } 
    return new Error("Session ended please login again!");
}