import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AuthProvider } from "../utils/authContext";
import { Abril_Fatface, Lato } from "next/font/google";

const abril_fatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${abril_fatface.className} ${lato.className}`}
      id="main-flex-parent"
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </main>
  );
}
