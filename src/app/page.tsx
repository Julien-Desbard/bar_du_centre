import Events from "@/components/events/events";
import HeroSection from "@/components/homepage/herosection";
import MenuSection from "@/components/menu/menu";
import Privatize from "@/components/privatize/privatize";

export default function Home() {
	return (
		<div className="h-screen overflow-y-scroll snap-y snap-proximity w-screen">
			{/* w-screen force la pleine largeur de l'écran */}

			<section className="min-h-screen snap-start w-full bg-cover bg-center bg-no-repeat"
				style={{backgroundImage : "url('/images/beer.jpg')", backgroundSize: 'cover'}}>
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<HeroSection />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4">
					<MenuSection />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4">
					<Privatize />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4">
					<Events />
				</div>
			</section>
		</div>
	);
}
