import Events from "@/components/sections/Events";
import HeroSection from "@/components/sections/Hero";
import MenuSection from "@/components/sections/Menu";
import Privatize from "@/components/sections/Privatize";

export default function Home() {
	return (
		<div className="h-screen overflow-y-scroll snap-y snap-proximity w-screen">
			{/* w-screen force la pleine largeur de l'écran */}

			<section className="min-h-screen snap-start w-full bg-cover bg-center bg-no-repeat"
				style={{backgroundImage : "url('/images/beer.jpg')", backgroundSize: 'cover'}}>
				<div className="max-w-[1280px] mx-auto h-full">
					<HeroSection />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<MenuSection />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Privatize />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Events />
				</div>
			</section>
		</div>
	);
}
