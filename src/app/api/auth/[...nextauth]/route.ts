import { authConfig } from "@/next-auth/nextauth.config";
import NextAuth from "next-auth";

const routeHandler = NextAuth(authConfig);
export {routeHandler as GET, routeHandler as POST};