import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import EventCarousel from "../carousel/EventCarousel";
import type { EmblaOptionsType } from "embla-carousel";
import ReservationTrigger from "../modals/reservationTrigger";
import { EventItem } from "@/@types";

type EventProps = {
	eventData: EventItem[];
};

export default function Events({ eventData }: EventProps) {
const OPTIONS: EmblaOptionsType = { 
  align: "start", 
  loop: true,
  skipSnaps: false,
  containScroll: "trimSnaps"
};

	const sectionTitle: SectionTitleProps = { part1: "nos", part2: "événements" };

	return (
		<section id="events" className=" text-white overflow-hidden pt-6">
			<SectionTitle sectionTitle={sectionTitle} />
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<div className="self-start m-6 2xl:mt-18">
					<h2 className="font-body text-2xl text-left">
						Venez participer à{" "}
						<span className="text-secondary">nos événements</span>
					</h2>
				</div>
				<div className="w-full mx-6 sm:py-6 lg:pb-3">
					<EventCarousel options={OPTIONS} eventData={eventData} />
				</div>
				<div className="2xl:mt-12">
					<ReservationTrigger/>
				</div>
			</div>
		</section>
	);
}