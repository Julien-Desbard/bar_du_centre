"use client";
import { Button } from "../ui/button";
import ContactModal from "../modals/contactModal";
import { useState } from "react";

export default function ContacTrigger() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className="flex justify-center">
				<Button onClick={() => setIsOpen(true)} className="max-w-45 mt-6 mb-12">
					Contactez-nous
				</Button>
			</div>
			<ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</div>
	);
}
