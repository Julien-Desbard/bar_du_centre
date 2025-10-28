import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import EventCarousel from "../carousel/EventCarousel"; 
import type { EmblaOptionsType } from "embla-carousel"; 
  import "@/styles/embla.css";  
import ReservationTrigger from "../modals/reservationTrigger";

export type Content = {
	id: number;
	name: string;
	title: string;
	subtitle: string;
	jour: string;
	date: string;
};
// lg:hidden self-center mt-6
// xl:hidden
// max-xl:hidden self-center mb-12
export default function Events() {

	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const imageContent: Content[] = [
		{
			id: 1,
			name: "concert_jazz",
			title: "CONCERT",
			subtitle: "JAZZ",
			jour: "samedi",
			date: "11.10.2025",
		},
		{
			id: 2,
			name: "deguisees",
			title: "SOIREE",
			subtitle: "DEGUISEE",
			jour: "samedi",
			date: "18.10.2025",
		},
		{
			id: 3,
			name: "dj",
			title: "SOIREE",
			subtitle: "DJ",
			jour: "samedi",
			date: "25.10.2025",
		},
		{
			id: 4,
			name: "micro",
			title: "BLINDTEST",
			subtitle: "MUSICAL",
			jour: "samedi",
			date: "02.11.2025",
		},
		{
			id: 5,
			name: "dj",
			title: "SOIREE",
			subtitle: "DJ",
			jour: "samedi",
			date: "25.10.2025",
		},
		{
			id: 6,
			name: "micro",
			title: "BLINDTEST",
			subtitle: "MUSICAL",
			jour: "samedi",
			date: "02.11.2025",
		},
	];

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
					<EventCarousel options={OPTIONS} imageContent={imageContent} />
				</div>
				<ReservationTrigger />
			</div>
		</section>
	);
}
