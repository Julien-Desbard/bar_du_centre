"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import { useState } from "react";

export default function MenuSection() {
	const [isOpen, setIsOpen] = useState(false);
	console.log("isOpen:", isOpen);
	return (
		<section
			id="menu"
			className="grid auto-rows-min w-full justify-center p-6 snap-start relative bg-[url('/images/background.jpg')] bg-cover bg-center min-h-screen text-white overflow-x-hidden
			lg:grid-cols-2 lg:justify-items-stretch lg:gap-y-6"
		>
			{/* --------------------- Menu ---------------------*/}
			<div
				className="grid auto-rows-min mt-12 justify-self-center
			max-sm:max-w-full max-sm:grid-cols-1 max-sm:gap-12
			lg:p-6 lg:row-start-1 lg:col-start-1 lg:mt-24"
			>
				<h2 className="col-start-1 justify-self-center self-center font-subtitle text-5xl text-h2 font-semibold">
					menu de <br />
					<span className="text-white">la cantine</span>
				</h2>
				<Image
					className="col-start-2 row-start- justify-self-center 
					max-sm:hidden
					"
					src="/images/burger_icon.png"
					alt="icone burger pour accéder au menu des plats"
					width={250}
					height={250}
				/>
				<Image
					className="col-start-1 row-start-2 justify-self-center 
					max-sm:hidden"
					src="/images/beer_icon.png"
					alt="icone bière pour accéder au menu des boissons"
					width={250}
					height={250}
				/>
				<h2
					className="place-self-end justify-self-center self-center font-subtitle text-5xl text-h2 font-semibold
				sm:col-start-2 sm:row-start-2"
				>
					carte des <br />
					<span className="text-white">boissons</span>{" "}
				</h2>
				<Button
					onClick={() => setIsOpen(true)}
					className=" max-w-45 justify-self-center
					max-sm:mb-20
					sm:col-span-2 sm:mt-8 sm:mb-18
					lg:hidden"
				>
					Réserver une table
				</Button>
			</div>
			{/* --------------------- Carte du jour ---------------------*/}

			<div
				className="grid gap-4 auto-rows-min justify-self-center justify-items-center overflow-x-hidden grid-cols-1
				max-sm:max-w-full
				lg:mt-30 lg:p-6 lg:col-start-2 lg:max-w-none"
			>
				<h2 className="font-subtitle text-5xl text-center pb-6 ">
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
					className="max-w-45 justify-self-center 
				max-sm:mt-8 max-sm:mb-20
				sm:mt-12 sm:mb-18 
				lg:hidden"
				>
					Réserver une table
				</Button>
			</div>
			<Button
				onClick={() => setIsOpen(true)}
				className="max-w-45 
			max-lg:hidden
			lg:row-start-2 lg:col-span-2 lg:justify-self-center lg:mb-6"
			>
				Réserver une table
			</Button>
			{/* --------------------- Horaires ---------------------*/}

			<div
				className="grid gap-2 gap-x-4 text-center max-w-full
				max-sm:grid-cols-1
				sm:grid-cols-2 sm:grid-rows-[auto_repeat(3,auto)] sm:grid-flow-col
				lg:grid-cols-3 lg:grid-rows-[auto_repeat(2,auto)] lg:grid-flow-row lg:p-6 lg:place-self-center lg:justify-items-center lg:row-start-4 lg:col-span-2
				2xl:grid-cols-4"
			>
				<h2
					className="text-4xl font-body justify-self-center pb-4
				sm:col-span-2 sm:row-start-1
				lg:col-span-3
				2xl:col-start-1 2xl:col-span-1 2xl:row-span-2 2xl:justify-self-center 2xl:self-center
				"
				>
					Les horaires
				</h2>
				<ul className="contents">
					<li
						className="block justify-self-center self-start text-xl
					sm:justify-self-start sm:self-center"
					>
						Lundi | Mardi | Mercredi:
						<span className="text-secondary">
							<br />
							12h-14h15 19h-22h30
						</span>
					</li>
					<li
						className="block justify-self-center self-start text-xl
					sm:justify-self-start sm:self-center
					2xl:self-center"
					>
						Jeudi: <span className="text-secondary">12h-14h15 || 19h-23h</span>
					</li>
					<li
						className="block justify-self-center self-start text-xl
					sm:justify-self-start sm:self-center
					2xl:self-center"
					>
						Vendredi:{" "}
						<span className="text-secondary">12h-14h30 || 19h-23h</span>
					</li>
					<li
						className="block justify-self-center self-center text-xl
					sm:justify-self-start sm:self-center
					"
					>
						Samedi: <span className="text-secondary">12h-15h30 || 19h-23h</span>
					</li>
					<li
						className="block justify-self-center self-start text-xl
					sm:justify-self-start sm:row-span-2 sm:self-center
					lg:row-span-1"
					>
						Dimanche:
						<span className="text-secondary"> 12h-15h || 19h-22h30</span>
					</li>
				</ul>
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
