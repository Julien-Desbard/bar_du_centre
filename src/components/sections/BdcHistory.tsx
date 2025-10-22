"use client";
import React from "react";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

export default function BdcHistory() {
	const [isOpen, setIsOpen] = useState(false);
	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "histoire",
	};

	return (
		<section id="gallery" className="snap-start h-screen text-white ">
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body text-4xl m-6 text-left">
						Un lieu à
						<span className="text-secondary"> l&apos;histoire riche</span>
					</h2>
				</div>

				<div>
					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-4 mb-40"
					>
						Réserver une table
					</Button>
				</div>
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
