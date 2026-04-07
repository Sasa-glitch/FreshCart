import { Category, ProductType } from "../types";

const BASE_URL = process.env.BASE_URL ?? "https://ecommerce.routemisr.com/api/";

// get all products api function 
export async function callProducts(): Promise<ProductType[] | undefined> {
    try {
        const res = await fetch(
            `${BASE_URL}v1/products`, 
            {
                cache: "force-cache",
                next: { revalidate: 60 * 60 * 24 * 1 }
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

// get all categories api function
export async function callCategories(): Promise<Category[] | undefined> {
    try {
        const res = await fetch(
            `${BASE_URL}v1/categories`,
            {
                cache: "force-cache"
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}