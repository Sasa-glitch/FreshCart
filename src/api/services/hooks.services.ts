import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useRedirectNonAuthUser(): () => boolean  {
    const router = useRouter();
    const session = useSession();

    return function checkAuth(): boolean {
        if (session.status !== "authenticated") {
            toast.error("You need to login to add items to cart", {
                action: {
                    label: "Login",
                    onClick: () => router.push("/login"),
                },
            });
            return false;
        }
        return true;
    };
    
}
