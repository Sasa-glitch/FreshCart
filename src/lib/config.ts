/**
 * Shared API base URL.
 * Falls back to the production URL so build-time static generation never
 * produces `undefinedv1/...` requests when the env variable is absent.
 */
export const BASE_URL =
    process.env.BASE_URL ?? "https://ecommerce.routemisr.com/api/";
