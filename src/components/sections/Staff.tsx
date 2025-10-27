"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "../carousel/StaffCarousel";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";
import "@/styles/embla.css";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

export type StaffContent = {
	id: number;
	name: string;
};

export default function Staff() {
	const [isOpen, setIsOpen] = useState(false);
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const staffContent: StaffContent[] = [
		{ id: 1, name: "fariborz" },
		{ id: 2, name: "jerome" },
		{ id: 3, name: "hamala" },
		{ id: 4, name: "fariborz" },
		{ id: 5, name: "jerome" },
		{ id: 6, name: "hamala" },
	];

	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "équipe",
	};
	return (
		<section id="gallery" className="snap-start min-h-screen text-white ">
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body text-3xl m-6 text-left">
						Une équipe <span className="text-secondary">soudée</span> et de{" "}
						<span className="text-secondary">passionés</span>
					</h2>
				</div>
				<div className="w-full px-6">
					<Carousel options={OPTIONS} staffContent={staffContent} />
				</div>
				<div>
					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-4 mb-12"
					>
						Réserver une table
					</Button>
				</div>
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
