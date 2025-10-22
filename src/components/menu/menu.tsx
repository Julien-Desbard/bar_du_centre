"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";

export default function MenuSection() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section
			id="menu"
			className="snap-start relative bg-bgbody bg-cover bg-center min-h-screen text-white overflow-hidden"
		>
			<div
				className="w-full max-w-[1200px] mx-auto p-4 flex flex-row flex-wrap justify-around gap-x-3
				lg:flex-1 
			xl:gap-x-12 "
			>
				{/* --------------------- Menu --------------------- */}
				<div
					className="flex flex-col items-center justify-center mt-12 
				max-lg:px-6 lg:w-fit lg:mt-24"
				>
					<div
						className="flex flex-col items-center
		max-sm:gap-y-6
		sm:grid sm:grid-cols-2 sm:grid-rows-2"
					>
						<h2 className="font-subtitle text-5xl text-h2 font-semibold text-center sm:col-start-1 sm:row-start-1 sm:self-center">
							menu de <br />
							<span className="text-white">la cantine</span>
						</h2>
						<Image
							className="max-sm:hidden sm:col-start-2 sm:row-start-1 sm:justify-self-center"
							src="/images/burger_icon.png"
							alt="icone burger pour accéder au menu des plats"
							width={250}
							height={250}
						/>
						<Image
							className="max-sm:hidden sm:col-start-1 sm:row-start-2 sm:justify-self-center"
							src="/images/beer_icon.png"
							alt="icone bière pour accéder au menu des boissons"
							width={250}
							height={250}
						/>
						<h2 className="font-subtitle text-5xl text-h2 font-semibold text-center sm:col-start-2 sm:row-start-2 sm:self-center">
							carte des <br />
							<span className="text-white">boissons</span>
						</h2>
					</div>

					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-4 mb-12 lg:hidden"
					>
						Réserver une table
					</Button>
				</div>

				{/* --------------------- Carte du jour --------------------- */}
				<div
					className="flex flex-col items-center gap-4 max-w-full w-fit justify-self-center
				lg:mt-30"
				>
					<h2 className="font-subtitle text-5xl text-center ">
						Carte du jour
					</h2>

					<h3 className="text-2xl font-light text-center text-secondary">
						Entrées
					</h3>
					<ul className="w-full space-y-2 px-4">
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words text-xl">
								Soupe de potiron et son lard grillé cest très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words text-xl">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
					</ul>

					<h3 className="text-2xl font-light text-center text-secondary">
						Plats
					</h3>
					<ul className="w-full space-y-2 px-4">
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words text-xl">
								Burger maison au cheddar
							</span>
							<span className="shrink-0 text-bg font-semibold">14€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words text-xl">
								Salade césar au poulet
							</span>
							<span className="shrink-0 text-bg font-semibold">12€</span>
						</li>
					</ul>

					<h3 className="text-2xl font-light text-center text-secondary">
						Desserts
					</h3>
					<ul className="w-full space-y-2 px-4">
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words text-xl">
								Mousse au chocolat maison
							</span>
							<span className="shrink-0 text-bg font-semibold">7€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words text-xl">
								Tarte aux pommes caramélisées
							</span>
							<span className="shrink-0 text-bg font-semibold">7€</span>
						</li>
					</ul>

					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-6 mb-12 lg:hidden"
					>
						Réserver une table
					</Button>
				</div>

				{/* Button desktop */}
				<div className="w-full flex justify-center max-lg:hidden lg:mt-6 lg:mb-24 xl:mb-12">
					<Button onClick={() => setIsOpen(true)} className="max-w-45">
						Réserver une table
					</Button>
				</div>

				{/* --------------------- Horaires --------------------- */}
				<div
					className="grid gap-2 gap-x-4 text-center
					max-sm:grid-cols-1
					sm:grid-cols-2 sm:grid-rows-[auto_repeat(3,auto)] sm:grid-flow-col sm:text-left
					lg:grid-cols-3 lg:grid-rows-[auto_repeat(2,auto)] lg:grid-flow-row lg:px-6 lg:place-self-center lg:justify-items-center
					"
				>
					<h2
						className="text-4xl font-body justify-self-center pb-4
					sm:col-span-2 sm:row-start-1
					lg:col-span-3
					"
					>
						Les horaires
					</h2>
					<ul className="contents text-xl">
						<li
							className="block justify-self-center self-start
						sm:justify-self-start sm:self-center
						lg:self-start"
						>
							Lundi | Mardi | Mercredi:
							<br />
							<span className="text-secondary">12h-14h15 19h-22h30</span>
						</li>
						<li
							className="block justify-self-center self-start
						sm:justify-self-start sm:self-center lg:self-start
						"
						>
							Jeudi:{" "}
							<span className="text-secondary">12h-14h15 || 19h-23h</span>
						</li>
						<li
							className="block justify-self-center self-start
			sm:justify-self-start sm:self-center
			lg:self-start
			"
						>
							Vendredi:{" "}
							<span className="text-secondary">12h-14h30 || 19h-23h</span>
						</li>
						<li
							className="block justify-self-center self-center
			sm:justify-self-start sm:self-center lg:self-start"
						>
							Samedi:{" "}
							<span className="text-secondary">12h-15h30 || 19h-23h</span>
						</li>
						<li
							className="block justify-self-center self-start
			sm:justify-self-start sm:row-span-2 sm:self-center
			lg:row-span-1 lg:self-start"
						>
							Dimanche:
							<span className="text-secondary"> 12h-15h || 19h-22h30</span>
						</li>
					</ul>
				</div>
			</div>
			<ReservationModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</section>
	);
}
