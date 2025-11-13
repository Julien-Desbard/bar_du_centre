import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import EventCarousel from "../carousel/EventCarousel"; 
import type { EmblaOptionsType } from "embla-carousel"; 
  import "@/styles/embla.css";  
import ReservationTrigger from "../modals/reservationTrigger";


export default function Events() {

	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };


	const sectionTitle: SectionTitleProps = { part1: "nos", part2: "événements" };

	return (
		<section
			id="events"
			className="snap-start min-h-screen text-white overflow-hidden"
		>
			<SectionTitle sectionTitle={sectionTitle} />
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<div className="self-start">
					<h2 className="font-body text-3xl m-6 text-left">
						Venez participer à{" "}
						<span className="text-secondary">nos événements</span>
					</h2>
				</div>
				<div className="w-full px-6 pb-6">
					<EventCarousel options={OPTIONS} />
				</div>
				<ReservationTrigger />
			</div>
		</section>
	);
}
