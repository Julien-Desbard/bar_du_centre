import Events from "@/components/events/events";
import HeroSection from "@/components/homepage/herosection";
import MenuSection from "@/components/menu/menu";
import Privatize from "@/components/privatize/privatize";

export default function Home() {
	return (
		<main className=" h-screen w-full overflow-x-hidden overflow-y-scroll snap-y snap-proximity scroll-smooth">
			<HeroSection />
			<MenuSection />
			<Privatize />
			<Events />
		</main>
	);
}
