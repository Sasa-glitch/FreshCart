import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode"

interface SignInReplyType {
    message: string;
    user: {
        name: string;
        role: string;
        email: string;
    };
    token: string;
}

export const authConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: "User sign up",
            credentials: {
                email: {
                    label: "Email",
                    placeholder: "Enter User Mail",
                    type: "email",
                },
                password: {
                    label: "Password",
                    placeholder: "Enter Password",
                    type: "Password",
                },
            },
            authorize: async function (Credentials) {
                try {
                    const res = await fetch(
                        `${process.env.BASE_URL}v1/auth/signin`,
                        {
                            method: "POST",
                            body: JSON.stringify(Credentials),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                    );
                    if (!res.ok) {
                        return null;
                    }
                    const resData: SignInReplyType = await res.json();
                    const {id}: {id: string} = jwtDecode(resData.token);
                    const {
                        user: { name, email },
                        token,
                    } = resData;
                    return {id, name, email, token };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt(params) {
            console.log("These are the params", params);
            if (params.user) {
                params.token.token = params.user.token;
                params.token.id = params.user.id;
            }
            return params.token;
        },
        session(params) {
            params.session.user.id = params.token.id;
            return params.session;
        }
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 7,
    },
    pages: {
        signIn: "/login",
    },
};
