"use client";
import { Cake, PartyPopper, Martini } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import ContactModal from "../modals/contactModal";
import { useState } from "react";

export default function Privatize() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section
			id="private"
			className="snap-start bg-bgbody bg-cover bg-center text-white h-screen overflow-hidden"
		>
			<div
				className="w-full h-full flex flex-col max-w-[1280px] mx-auto"
			>
				<h2 className="pt-24 px-6 font-subtitle text-5xl text-h2 font-semibold flex-shrink-0">
					salle
					<br />
					<span className="text-white">privatisable</span>
				</h2>

				<p className="text-4xl px-6 mt-12 mb-12 font-body text-left flex-shrink-0">
					Reservez notre <span className="text-secondary ">seconde salle</span>
				</p>

				<div className="flex flex-col mt-12 min-h-0 max-sm:mt-6 lg:flex-row lg:gap-x-6 lg:items-center lg:justify-center xl:gap-x-18">
					<div
						className="px-6 flex-1 min-h-0 flex items-center
						lg:px-0 lg:flex-initial lg:h-[400px]
						xl:h-[450px]
						2xl:h-[500px]"
					>
						<div className="w-full h-full relative">
							<Image
								alt="image de la salle privatisable"
								src="/images/privatize.webp"
								width={400}
								height={300}
								className="w-full h-full object-contain lg:object-left"
							/>
						</div>
					</div>

					{/* Texte descriptif */}
					<div
						className="text-2xl font-light px-6 mt-6 flex flex-col
						lg:flex-[1] lg:max-w-sm lg:px-0 lg:m-0"
					>
						<p className="pb-3">Pour vos: </p>
						<ul className="flex flex-col gap-3">
							<li className="flex items-center gap-3 ml-3">
								<Cake size={24} />
								<span>Anniversaires</span>
							</li>
							<li className="flex items-center gap-3 ml-3">
								<PartyPopper size={24} />
								<span>Pots de départ</span>
							</li>
							<li className="flex items-center gap-3 ml-3">
								<Martini size={24} />
								<span>Soirées en famille ou entre amis</span>
							</li>
						</ul>
						<p className="pt-6">
							Vous pouvez réserver notre seconde salle d&apos;une capacité de 40
							personnes
						</p>
						<div className="flex pt-12 self-center
						md:pb-12">
							<Button onClick={() => setIsOpen(true)} className="max-w-45 ">
								Contactez-nous
							</Button>
						</div>
					</div>
				</div>

				{/* <div className="flex justify-center w-full  flex-shrink-0 lg:hidden">
					<Button onClick={() => setIsOpen(true)} className="max-w-45">
						Contactez-nous
					</Button>
				</div> */}
			</div>
				<ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
