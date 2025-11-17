import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import EventCarousel from "../carousel/EventCarousel";
// import type { EmblaOptionsType } from "embla-carousel";
// import "@/styles/embla.css";
import ReservationTrigger from "../modals/reservationTrigger";

export default function Events() {
	// const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const sectionTitle: SectionTitleProps = { part1: "nos", part2: "événements" };

	return (
		<section
			id="events"
			className=" text-white overflow-hidden pt-6"
		>
			<SectionTitle sectionTitle={sectionTitle} />
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<div className="self-start m-6">
					<h2 className="font-body text-2xl text-left">
						Venez participer à{" "}
						<span className="text-secondary">nos événements</span>
					</h2>
				</div>
				<div className="w-full mx-6 sm:py-6 lg:pb-3">
					<EventCarousel  />
				</div>
				<div className="">
					<ReservationTrigger />
				</div>
			</div>
		</section>
	);
}
