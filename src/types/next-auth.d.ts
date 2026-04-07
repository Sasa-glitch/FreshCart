import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        /** The backend JWT token returned after signing in */
        token?: string;
    }

    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        /** Backend JWT token stored in the NextAuth JWT */
        token?: string;
        id?: string;
    }
}
