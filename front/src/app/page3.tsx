import Events from "@/components/sections/Events";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Privatize from "@/components/sections/Privatize";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<section
				className="min-h-screen snap-start w-full relative"
			>
				<Image
					src="/images/beer.webp"
					alt="Le Bar du Centre, Arrière-plan"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 z-0"></div>

				<div className="max-w-[1280px] mx-auto h-full relative z-10">
					<Hero />
				</div>
			</section>

			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Menu />
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
		</>
	);
}
