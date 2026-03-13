import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/authContext";
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegister() {
  const router = useRouter();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) {
      router.replace("/");
    }
  }, [router, isLogged]);

  return (
    <>
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-center bg-white p-3">
          <h1 className="abril-fatface-regular my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
            S&apos;inscrire ou se connecter
          </h1>
        </div>
        <Login />
        <Register />
      </div>
    </>
  );
}
