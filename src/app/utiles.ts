import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getDecodedToken(): Promise<string | null> {
    const nextCookies = await cookies();
    const nextAuthJWTCoded = nextCookies.get("__Secure-next-auth.session-token")?.value ?? nextCookies.get("next-auth.session-token")?.value;
    const nextAuthJWTDecoded = await decode({token: nextAuthJWTCoded, secret: process.env.NEXTAUTH_SECRET!});
    if (nextAuthJWTDecoded) {
        console.log("This is the token I suppose", nextAuthJWTDecoded)
        return nextAuthJWTDecoded.token as string
    }
    else {
        return null;
    }
}