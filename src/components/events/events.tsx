"use client";
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Footer from "../footer/footer";
import Carousel from "../carousel/EmblaCarousel";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";
import '@/styles/embla.css'

export default function Events() {
	const [isOpen, setIsOpen] = useState(false);
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	return (
		<section
			id="events"
			className="snap-start bg-bgbody bg-cover bg-center h-screen text-white "
		>
			<div className="w-full h-full flex flex-col justify-between items-center max-w-[1200px] mx-auto">
				<div className='self-start'>
					<h2 className="pt-24 px-6 font-subtitle text-5xl text-h2 font-semibold ">
						nos
						<br />
						<span className="text-white">événements</span>
					</h2>
				</div>
				<div className="w-full mt-18">
					<Carousel options={OPTIONS}/>
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
