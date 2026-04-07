"use server"

import { RegisterDataType } from "./zodSchema";

export async function signUpRequest(data: RegisterDataType) {
    try {
            // sending the request
            const res =  await fetch(`${process.env.BASE_URL}v1/auth/signup`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // if (!res.ok) {
            //     throw new Error(`HTTP error! status: ${res.status}`);
            // }
            const resData = await res.json();
            if (resData.statusMsg === "fail") {
                return resData.message;
            }
            return true
        } catch (error : any) {
            console.error(error);
            if (error.message) {
                return error.message
            }
            return false;
        }
}
