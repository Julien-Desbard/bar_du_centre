"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReservationModal from "../modals/reservationModal";

export default function ReservationTrigger() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} className="max-w-45">
				Réserver une table
			</Button>

			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}
