"use client";
import React from "react";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import Link from "next/link";
import Image from "next/image";

export default function BdcHistory() {
	const [isOpen, setIsOpen] = useState(false);
	const sectionTitle: SectionTitleProps = {
		part1: "notre",
		part2: "histoire",
	};

	return (
		<section id="history" className="snap-start min-h-screen text-white ">
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body text-4xl m-6 text-left">
						Un lieu à
						<span className="text-secondary"> l&apos;histoire riche</span>
					</h2>
				</div>
				<div className="flex">
					<section className="text-white font-bod flex flex-col lg:max-w-5/10 p-6 lg:pl-6 lg:pr-3 gap-6 text-justify">
						<p>
							On me surnomme couramment le BDC. Mais savez-vous que les Angevins
							m&apos;ont jadis appelé Maison du Roi David ou maison Vogelweith ?
							C&apos;st sous le nom de Grand Café que je suis devenu le premier
							débit de boisson angevin au XVIIIe siècle. J&apos;étais un lieu
							particulièrement à la mode. Avant cela, mon histoire remonte
							jusqu&apos;à 1557, mais j&apos;ai été reconstruit à plusieurs
							reprises.
						</p>
						<p>
							Lorsque vous sirotez un verre sur ma terrasse, vous vous trouvez
							quelques mètres au-dessus de ceux qui faisaient pareil il y a plus
							de 200 ans, car la rue Saint-Laud a été rehaussée depuis, afin
							d&apos;obtenir un centre-ville moins pentu. Les anciens
							rez-de-chaussée sont donc devenus des caves.
						</p>
						<p>
							Les commerçants qui prennent leur café le matin, les travailleurs
							en pause le midi, les jeunes à l&apos;heure de l&apos;apéritif ou
							en soirée : aujourd&apos;hui lieu de rendez-vous et de vie sociale
							quotidienne, j&apos;ai aussi été une boutique de marchands,
							d&apos;apothicaire ou d&apos;un maître pâtissier.
						</p>
						<p>
							Reconstruit en 1904, je me suis vu utiliser comme maison close. Je
							n&apos;en suis pas particulièrement fier, mais ça fait aussi
							partie de mon passé. Jusqu’à il y a peu mes anges peints sur le
							plafond au-dessus du bar, le style cossu de mes boiseries et de
							mes moquettes murales pourpres témoignaient encore de cette
							époque.
						</p>
						<p>
							Mon ancienne façade Renaissance datant de 1557 a été déplacée au
							moment de cette reconstruction : elle est désormais bien visible,
							encastrée dans le mur d&apos;un bâtiment à proximité de
							l&apos;hôtel-musée Pincé, près de la place du Ralliement.
						</p>
						<p>
							Mes actuels patrons Arash et Mani, respectueux de leurs
							prédécesseurs, ont remis en avant mes vieilles pierres dans la
							salle principale.
						</p>
						<p>
							A l&apos;intérieur du mur d&apos;une des chambres (ah oui, je fais
							aussi hôtel de voyageurs), ils ont retrouvé une carte postale
							oubliée par un visiteur il y a plus d&apos;un siècle, ainsi
							qu&apos;une vieille boîte de biscuits.
						</p>
						<p>
							Depuis la reprise de l’établissement en 2003, celui-ci a connu
							plusieurs agrandissements et compte désormais une belle cuisine.
						</p>
						<p>
							Si vous voulez en savoir plus, voici un lien vers un article des
							archives d’Angers.
						</p>
						<Link
							href="https://archives.angers.fr/chroniques-historiques/les-chroniques-par-annees/octobre-2010-decembre-2019/le-premier-cafe/index.html"
							className="text-secondary transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
						>
							Pour plus d&apos;infos, cliquer ici{" "}
						</Link>
						<Button
							onClick={() => setIsOpen(true)}
							className="max-w-45 lg:hidden self-center mt-6"
						>
							Réserver une table
						</Button>
					</section>
					<div className="pr-6 pl-3 flex max-lg:hidden lg:flex-col lg:items-center lg:justify-center gap-18">
						<Image
							src="/images/bdchistory/histoire.jpg"
							alt="Photos du bar du centre au fil des anénes"
							width={500}
							height={500}
						/>
						<Button
							onClick={() => setIsOpen(true)}
							className="max-w-45 xl:hidden"
						>
							Réserver une table
						</Button>
					</div>
				</div>
				<Button
					onClick={() => setIsOpen(true)}
					className="max-w-45 max-xl:hidden self-center mb-6"
				>
					Réserver une table
				</Button>
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
