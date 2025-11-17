import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Header from "@/components/layout/Header";
import { Playfair_Display, Poppins } from "next/font/google";
import { AuthProvider } from "@/app/context/AuthContext";
import { SessionProvider } from "next-auth/react";

const playfair = Playfair_Display({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-title",
});
const poppins = Poppins({
	weight: ["300", "400", "500", "600"],
	subsets: ["latin"],
	variable: "--font-body",
});

export const metadata: Metadata = {
	title: "le Bar du Centre",
	description: "Brasserie le Bar du Centre à Angers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={`${playfair.variable} ${poppins.variable} scroll-smooth`}>
			<body
				className="bg-bgbody overflow-x-hidden"
				suppressHydrationWarning={true}
			>
				<SessionProvider>
					<AuthProvider>
						<header className="w-full fixed top-0 z-50">
							<div className="max-w-[1280px] mx-auto px-4 bg-transparent lg:backdrop-blur-md">
								<Header />
							</div>
						</header>

						<main className="w-full">
							{children}
						</main>
					</AuthProvider>
				</SessionProvider>
			</body>
		</html>
	);
}