import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";

// Hook that redirects to /loginRegister when no JWT is stored.
export function useRequireAuth() {
  const router = useRouter();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) {
      router.replace("/loginRegister");
    }
  }, [router, isLogged]);
}
