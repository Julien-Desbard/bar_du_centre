"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReservationModal from "./reservationModal";

export default function ReservationTrigger() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} className="max-w-45"
			aria-label="Reserver une table"
				>
				Réserver une table
			</Button>

			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}
