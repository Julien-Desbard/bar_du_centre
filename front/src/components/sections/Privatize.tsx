import { Cake, PartyPopper, Martini } from "lucide-react";
import Image from "next/image";

import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import ContacTrigger from "../modals/contactTrigger";

export default function Privatize() {
	const sectionTitle: SectionTitleProps = {
		part1: "salle",
		part2: "privatisable",
	};
	return (
		<section
			id="private"
			className="snap-start text-white overflow-hidden pt-6"
		>
			<SectionTitle sectionTitle={sectionTitle} />
			<div className="w-full h-full flex flex-col justify-between self-start mx-auto">
				<div className="px-6 mt-6 2xl:mt-12">
					<h2 className="text-2xl font-body text-left ">
						Reservez notre{" "}
						<span className="text-secondary ">seconde salle</span>
					</h2>
				</div>
				<div className="lg:flex lg:flex-row sm:py-6">
					<div className="px-6 mt-6 flex justify-center">
						<Image
							src="/images/privatize.webp"
							alt="Privatisation"
							width={500}
							height={400}
							quality={75}
							sizes="(max-width: 768px) 100vw, 500px"
							className="w-full max-xl:max-w-[500px] xl:max-w-[500px] h-auto"
						/>
					</div>
					{/* Texte descriptif */}
					<div className="px-6 mt-6 flex-1 flex flex-col justify-center gap-3 max-sm:text-xl/8 text-2xl/10 font-light">
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
						<p className="">
							Réservez notre seconde salle d&apos;une capacité de{" "}
							<span className="text-secondary">40 personnes</span>
						</p>
					</div>
				</div>
						<div className="mt-6 mb-12 2xl:m-12">
							<ContacTrigger />
						</div>
			</div>
		</section>
	);
}
