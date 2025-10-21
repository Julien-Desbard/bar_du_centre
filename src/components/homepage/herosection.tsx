"use client"
import { Button } from "@/components/ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";

export default function HeroSection() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<section
			id="home"
			className="snap-start h-screen flex items-center"
		>
			<div className="max-w-[600px] flex flex-col items-center pt-36 p-6">
				<h1 className="font-title text-5xl pb-12 font-regular text-center text-white">LE BAR DU CENTRE</h1>
				<h2 className="font-body pb-12 text-2xl font-thin text-center text-white">
					En plein coeur d&apos;Angers, le{" "}
					<span className="text-secondary">BDC</span> pour les intîmes
				</h2>
				<Button
					onClick={() => setIsOpen(true)}
					className="max-w-45">Réserver une table</Button>
				<ReservationModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)} />
			</div>
		</section>
	);
}