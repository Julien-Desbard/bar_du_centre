import { Cake, PartyPopper, Martini } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Privatize() {
	return (
		<section
			id="private"
			className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center text-white h-screen min-h-screen"
		>
			<div
				className="w-full flex flex-col max-w-[1350px] mx-auto
				xl:max-w-[90vw] xl:h-full
				2xl:max-w-[1350px]"
			>
				<h2
					className="pt-24 pl-24 font-subtitle text-5xl text-h2 font-semibold
					max-sm:pl-6
					max-w-[96rem]
					xl:pt-12"
				>
					salle
					<br />
					<span className="text-white">privatisable</span>
				</h2>
				<p
					className="text-4xl px-6 mt-12 text-secondary font-bold text-center
					sm:px-12
					xl:px-12 xl:m-6"
				>
					Reservez notre seconde salle
				</p>
				<div
	className="flex flex-col mt-12
	lg:mt-6
	xl:flex-row xl:gap-x-6 xl:items-center xl:justify-center"
>
	<div
		className="px-6 overflow-hidden
		sm:max-h-[35vh]
		md:max-h-[40vh]
		lg:max-h-[50vh]
		xl:flex-[2] xl:max-h-none xl:px-0"
	>
		<Image
			alt="image de la salle privatisable"
			src="/images/privatize.webp"
			width={400}
			height={300}
			className="w-full h-auto object-contain
			sm:max-h-[35vh]
			lg:max-h-[40vh]
			xl:max-h-[60vh]"
		/>
	</div>

	{/* Texte descriptif */}
	<div
		className="text-2xl font-light px-6 mt-12 flex flex-col
		sm:px-12
		lg:mt-6
		xl:flex-[1] xl:max-w-sm xl:px-0 xl:mt-0 "
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
	</div>
</div>

				{/* Button */}
				<div className="flex justify-center w-full my-6
				md:my-6
				xl:pt-6 xl:pb-12">
					<Button className="max-w-45">Contactez-nous</Button>
				</div>
			</div>
		</section>
	);
}