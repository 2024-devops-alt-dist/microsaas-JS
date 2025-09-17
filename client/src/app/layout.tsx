import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surprise !",
  description: "Gestion de listes de cadeaux lors d'événements festifs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
      >
        {children}
      </body>
    </html>
  );
}
