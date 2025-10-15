import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="main-section p-5 m-5">{children}</main>
      <Footer />
    </>
  );
}
