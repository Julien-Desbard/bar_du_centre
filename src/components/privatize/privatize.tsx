import { Cake, PartyPopper, Martini } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Privatize() {
	return (
		<section
			id="private"
			className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
		>
			<h2
				className="pt-24 pl-24 font-subtitle text-5xl text-h2 font-semibold
				max-sm:pl-6"
			>
				salle
				<br />
				<span className="text-white">privatisable</span>
			</h2>
			<div className="w-full grid mt-12">
					<p className="text-4xl p-6 justify-self-center text-secondary font-bold">Reservez notre seconde salle</p>
				<div className="p-6">
					<Image
						alt="image de la salle privatisable"
						src="/images/privatize.webp"
						width={480}
						height={480}
						className="justify-self-center"
					/>
				</div>
				<div className="text-2xl font-light p-6 grid">
					<ul className=" grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 justify-self-center">
						<Cake
							className="self-center justify-self-end"
							size={24}
						/>
						<li className=" self-center justify-self-start">
							Anniversaire
						</li>
						<PartyPopper
							className="self-center justify-self-end"
							size={24}
						/>
						<li className="self-center justify-self-start">
							Pots de départ
						</li>
						<Martini
							className="self-center justify-self-end"
							size={24}
						/>
						<li className="self-center justify-self-start">
							Soirées en famille
						</li>
					</ul>
				</div>
				<Button className="max-w-45 justify-self-center mx-6 mt-6 mb-12">Contactez-nous</Button>
			</div>
		</section>
	);
}
