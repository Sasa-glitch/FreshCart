import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    console.log("From Proxy", token);
    if (!!token) {
        return NextResponse.next();
    }
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL_INTERNAL}login`)
}

export const config = {
    matcher: ["/cart", "/profile", "/allorders", "/checkout"],
}