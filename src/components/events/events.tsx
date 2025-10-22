"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Footer from "../footer/footer";
import Carousel from "../carousel/EventCarousel";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";
import "@/styles/embla.css";

export type Content = {
	id: number;
	name: string;
	title: string;
	subtitle: string;
	jour:string;
	date:string
};

export default function Events() {
	const [isOpen, setIsOpen] = useState(false);
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const imageContent: Content[] = [
		{ id: 1, name: "concert_jazz", title: "CONCERT", subtitle: "JAZZ", jour:"samedi", date:"11.10.2025" },
		{ id: 2, name: "deguisees", title: "SOIREE", subtitle: "DEGUISEE", jour:"samedi", date:"18.10.2025" },
		{ id: 3, name: "dj", title: "SOIREE", subtitle: "DJ", jour:"samedi", date:"25.10.2025" },
		{ id: 4, name: "micro", title: "BLINDTEST", subtitle: "MUSICAL", jour:"samedi", date:"02.11.2025" },
	];
	return (
		<section
			id="events"
			className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white "
		>
			<div className="w-full h-full flex flex-col justify-between items-center max-w-[1200px] mx-auto">
				<div className="self-start">
					<h2 className="pt-24 px-6 font-subtitle text-5xl text-h2 font-semibold ">
						nos
						<br />
						<span className="text-white">événements</span>
					</h2>
				</div>
								<div className="self-start">
					<h2 className="font-body text-4xl mx-6 mt-6 text-left">
						Venez participer à <span className="text-secondary">nos événements</span>
					</h2>
				</div>
				<div className="w-full mt-12">
					<Carousel options={OPTIONS} imageContent={imageContent} />
				</div>
				<div>
					<Button onClick={() => setIsOpen(true)} className="max-w-45 mb-12">
						Réserver une table
					</Button>
				</div>
				<Footer />
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
