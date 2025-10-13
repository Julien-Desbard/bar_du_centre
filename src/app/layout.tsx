import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";

import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ weight: ["400","500","600","700"], subsets: ["latin"], variable: "--font-title" });
const poppins  = Poppins({ weight: ["300","400","500","600"], subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "le Bar du Centre",
  description: "Brasserie le Bar du Centre - Angers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr"
    className={`${playfair.variable} ${poppins.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
