
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import ReservationTrigger from "../modals/reservationTrigger";
import Carousel from "../carousel/GalleryCarousel";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import "@/styles/embla.css";

export type BrasserieContent = {
	id: number;
	name: string;
};

export default function Gallery() {
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };


	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "brasserie",
	};
	return (
		<section
			id="gallery"
			className="snap-start relative text-white overflow-hidden min-h-screen max-sm:pt-12"
		>
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start m-6">
					<h2 className="font-body max-sm:text-2xl text-3xl text-left">
						Le <span className="text-secondary">Bar Du Centre</span> sous toutes
						ses coutures
					</h2>
				</div>
				<div className="w-full mx-6 sm:py-6 lg:pb-3">
					<Carousel options={OPTIONS} />
				</div>
				<ReservationTrigger />
			</div>
		</section>
	);
}
