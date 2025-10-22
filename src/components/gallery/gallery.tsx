"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "../carousel/GalleryCarousel";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";
import "@/styles/embla.css";

export type BrasserieContent = {
	id: number;
	name: string;
};

export default function Gallery() {
	const [isOpen, setIsOpen] = useState(false);
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const brasserieContent: BrasserieContent[] = [
		{ id: 1, name: "le zinc" },
		{ id: 2, name: "Arrière salle" },
		{ id: 3, name: "Le bar" },
		{ id: 4, name: "Salle privatisable" },
		{ id: 5, name: "Décoration" },
		{ id: 6, name: "l'entrée" },
		{ id: 7, name: "" },
		{ id: 8, name: "" },
	];
	return (
		<section
			id="gallery"
			className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white "
		>
			<div className="w-full h-full flex flex-col justify-between items-center max-w-[1200px] mx-auto">
				<div className="self-start">
					<h2 className="pt-24 px-6 font-subtitle text-5xl text-h2 font-semibold ">
						notre
						<br />
						<span className="text-white">brasserie</span>
					</h2>
				</div>
				<div className="self-start">
					<h2 className="font-body text-4xl mt-18 m-6 text-left">
						Le <span className="text-secondary">Bar Du Centre</span> sous toutes
						ses coutures
					</h2>
				</div>
				<div className="w-full p-6">
					<Carousel options={OPTIONS} brasserieContent={brasserieContent} />
				</div>
				<div>
					<Button onClick={() => setIsOpen(true)} className="max-w-45 mt-6 mb-30">
						Réserver une table
					</Button>
				</div>
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}

