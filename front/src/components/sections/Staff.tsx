import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import ReservationTrigger from "../modals/reservationTrigger";
import Carousel from "../carousel/StaffCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "@/styles/embla.css";

export type StaffContent = {
	id: number;
	name: string;
};

export default function Staff() {
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "équipe",
	};
	return (
		<section
			id="gallery"
			className="snap-start relative text-white overflow-hidden min-h-screen"
		>
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body text-3xl m-6 text-left">
						Une équipe <span className="text-secondary">soudée</span> et de{" "}
						<span className="text-secondary">passionnés</span>
					</h2>
				</div>
				<div className="w-full px-6 sm:py-6 lg:pb-3">
					<Carousel options={OPTIONS} />
				</div>
				<ReservationTrigger />
			</div>
		</section>
	);
}
