"use client";

import Events from "@/components/events/events";
import Footer from "@/components/footer/footer";
import HeroSection from "@/components/homepage/herosection";
import MenuSection from "@/components/menu/menu";
import Privatize from "@/components/privatize/privatize";

export default function Home() {
	return (
		<main className=" h-screen overflow-y-scroll snap-y snap-proximity">
			<HeroSection />
			<MenuSection />
			<Privatize />
			<Events />
			<Footer />
		</main>
	);
}
