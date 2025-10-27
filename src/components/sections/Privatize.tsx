"use client";
import { Cake, PartyPopper, Martini } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import ContactModal from "../modals/contactModal";
import { useState } from "react";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

export default function Privatize() {
	const [isOpen, setIsOpen] = useState(false);
	const sectionTitle: SectionTitleProps = {
		part1: "salle",
		part2: "privatisable",
	};
	return (
		<section
			id="private"
			className="snap-start text-white min-h-screen overflow-hidden"
		>
			<SectionTitle sectionTitle={sectionTitle} />
			<div className="w-full h-full flex flex-col justify-between self-start mx-auto">
				<div className="px-6">
					<h2 className="text-3xl font-body text-left mt-6">
						Reservez notre{" "}
						<span className="text-secondary ">seconde salle</span>
					</h2>
				</div>
				<div className="lg:flex lg:flex-row">
					<div className="px-6 mt-6 flex justify-center">
						<Image
							alt="image de la salle privatisable"
							src="/images/privatize.webp"
							width={800}
							height={600}
							className="sm:max-w-lg"
						/>
					</div>
					{/* Texte descriptif */}
					<div className="px-6 mt-6 flex-1 flex flex-col justify-between">
						<div className="text-2xl/10 font-light">
							<p>Pour vos : </p>
							<ul>
								<li className="flex items-center gap-2">
									<Cake size={24} className="text-secondary" />
									<span>Anniversaires</span>
								</li>
								<li className="flex items-center gap-2">
									<PartyPopper size={24} className="text-secondary" />
									<span>Pots de départ</span>
								</li>
								<li className="flex items-center gap-2">
									<Martini size={24} className="text-secondary" />
									<span>Soirées en famille ou entre amis</span>
								</li>
							</ul>
							<p className="mt-6">
								Réservez notre seconde salle d&apos;une capacité de{" "}
								<span className="text-secondary">40 personnes</span>
							</p>
						</div>
				<div className="flex justify-center">
							<Button
								onClick={() => setIsOpen(true)}
								className="max-w-45 mt-6 mb-12"
							>
								Contactez-nous
							</Button>
						</div>
					</div>
				</div>
				<div className="self-center">
					{/* <Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-6 mb-12 lg:hidden"
					>
						Contactez-nous
					</Button> */}
				</div>
			</div>
			<ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
