
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

	const brasserieContent: BrasserieContent[] = [
		{ id: 1, name: "le zinc" },
		{ id: 2, name: "Arrière salle" },
		{ id: 3, name: "Le bar" },
		{ id: 4, name: "Seconde salle" },
		{ id: 5, name: "Décoration" },
		{ id: 6, name: "l'entrée" },
		{ id: 7, name: "" },
		{ id: 8, name: "" },
	];

	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "brasserie",
	};
	return (
		<section
			id="gallery"
			className="snap-start min-h-screen text-white overflow-hidden "
		>
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body text-3xl m-6 text-left">
						Le <span className="text-secondary">Bar Du Centre</span> sous toutes
						ses coutures
					</h2>
				</div>
				<div className="w-full px-6 pb-6">
					<Carousel options={OPTIONS} brasserieContent={brasserieContent} />
				</div>
				<ReservationTrigger />
			</div>
		</section>
	);
}
