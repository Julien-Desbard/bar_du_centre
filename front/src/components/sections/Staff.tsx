import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import ReservationTrigger from "../modals/reservationTrigger";
import Carousel from "../carousel/StaffCarousel";
import { StaffItems } from "@/@types";

type StaffProps = {
	staffData : StaffItems[]
}

export default function Staff({staffData}:StaffProps) {

	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "équipe",
	};
	return (
		<section
			id="gallery"
			className="snap-start relative text-white overflow-hidden"
		>
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body text-2xl m-6 text-left">
						Une équipe <span className="text-secondary">soudée</span> et de{" "}
						<span className="text-secondary">passionnés</span>
					</h2>
				</div>
				<div className="w-full px-6 sm:py-6 lg:pb-3">
					<Carousel staffData={staffData}/>
				</div>
				<div className="mb-12">
				<ReservationTrigger />
				</div>
			</div>
		</section>
	);
}
