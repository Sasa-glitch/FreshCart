"use server"

import { cookies } from "next/headers";
import { LoginDataType } from "./zodSchema";

export async function signUpRequest(data: LoginDataType) {
    try {
            // sending the request
            const res =  await fetch(`${process.env.BASE_URL}v1/auth/signin`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resData = await res.json();
            if (res.ok) {
                const cookie = await cookies();
                cookie.set("tkn", resData.token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                })
                return true;
            }
            if (resData.statusMsg === "fail") {
                return resData.message;
            }
        } catch (error : any) {
            console.error(error);
            if (error.message) {
                return error.message
            }
            return false;
        }
}
