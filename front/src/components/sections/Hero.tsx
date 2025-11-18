import ReservationTrigger from "../modals/reservationTrigger";

import { Mouse } from "lucide-react";

export default function HeroSection() {
	return (
		<section
			id="home"
			className="snap-start h-screen flex flex-col justify-center text-white"
		>
			<div className="relative max-w-[600px] flex flex-col items-center pt-36 p-6">
				<h1 className="font-title text-5xl pb-12 text-center ">
					LE BAR DU CENTRE
				</h1>
				<h2 className="font-body pb-12 text-2xl font-thin text-center">
					En plein coeur d&apos;Angers, le{" "}
					<span className="text-secondary">BDC</span> pour les intîmes
				</h2>
				<ReservationTrigger />
			</div>
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 max-lg:hidden flex flex-col items-center animate-bounce text-white/50 text-center text-md">
				<Mouse className="mb-2" />
				<p>Scroll pour la suite</p>
			</div>
		</section>
	);
}