
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import ReservationTrigger from "../modals/reservationTrigger";
import Carousel from "../carousel/GalleryCarousel";
import React from "react";
import { GalleryItems } from "@/@types";

type GalleryProps = {
	galleryData : GalleryItems[]
}

export default function Gallery({galleryData}:GalleryProps) {

	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "brasserie",
	};
	return (
		<section
			id="gallery"
			className="snap-start relative text-white overflow-hidden pt-6"
		>
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start m-6 2xl:mt-12">
					<h2 className="font-body text-2xl text-left">
						Le <span className="text-secondary">Bar Du Centre</span> sous toutes
						ses coutures
					</h2>
				</div>
				<div className="w-full mx-6 sm:py-6 lg:pb-3">
					<Carousel galleryData={galleryData}/>
				</div>
				<div className="mb-12 2xl:m-12">
					<ReservationTrigger />
				</div>
			</div>
		</section>
	);
}
