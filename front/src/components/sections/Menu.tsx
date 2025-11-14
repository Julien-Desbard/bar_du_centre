"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import MenuModal from "../modals/menuModal";
import { useEffect, useState } from "react";
import CategoryCarte from "../lists/categoryCarte";

export type CarteItems = {
	id: number;
	name: string;
	categorie: string;
	prix: string;
};

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [nature, setNature] = useState("");
	const [carteItems, setCarteItems] = useState<CarteItems[]>([]);

	const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		async function getCarteItems() {
			try {
				const httpResponse = await fetch(`${BASE_URL}carte`);
				const data = await httpResponse.json();

				if (httpResponse.ok) {
					setCarteItems(data.allCarteItems);
				} else {
					throw new Error("L'appel à l'API a échoué, veuillez réessayer...");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getCarteItems();
	}, [BASE_URL]);

	const entrees = [
		...new Set(carteItems.filter((item) => item.categorie === "Entrées")),
	];

	const plats = [
		...new Set(carteItems.filter((item) => item.categorie === "Plats")),
	];

	const desserts = [
		...new Set(carteItems.filter((item) => item.categorie === "Desserts")),
	];

	return (
		<section
			id="menu"
			className="snap-start relative text-white overflow-hidden min-h-screen  max-sm:pt-7"
		>
			<div
				className="w-full h-full mx-auto p-4 flex flex-row flex-wrap justify-around gap-x-3
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
						<h2
							onClick={() => (setOpenMenu(true), setNature("plats"))}
							className="font-subtitle text-5xl/10 text-h2 font-semibold text-center max-sm:text-left sm:col-start-1 sm:row-start-1 sm:self-center"
						>
							menu de <br />
							<span className="text-white">la cantine</span>
						</h2>
						<Image
							className="max-sm:hidden sm:col-start-2 sm:row-start-1 sm:justify-self-center"
							src="/images/burger_icon.png"
							alt="icone burger pour accéder au menu des plats"
							width={250}
							height={250}
							onClick={() => (setOpenMenu(true), setNature("plats"))}
						/>
						<Image
							className="max-sm:hidden sm:col-start-1 sm:row-start-2 sm:justify-self-center"
							src="/images/beer_icon.png"
							alt="icone bière pour accéder au menu des boissons"
							width={250}
							height={250}
							onClick={() => (setOpenMenu(true), setNature("boissons"))}
						/>
						<h2
							onClick={() => (setOpenMenu(true), setNature("boissons"))}
							className="font-subtitle text-5xl/10 text-h2 font-semibold text-center max-sm:text-left sm:col-start-2 sm:row-start-2 sm:self-center"
						>
							carte des <br />
							<span className="text-white">boissons</span>
						</h2>
					</div>

					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-10 mb-12 lg:hidden"
					>
						Réserver une table
					</Button>
				</div>

				{/* --------------------- Carte du jour --------------------- */}
				<div
					className="flex flex-col items-center gap-2 max-w-full w-fit justify-self-center
				lg:mt-30"
				>
					<h2 className="font-subtitle text-4xl text-center ">Carte du jour</h2>

					<CategoryCarte items={entrees}/>
					<CategoryCarte items={plats}/>
					<CategoryCarte items={desserts}/>


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

				{/* emplacment des horaires */}
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<MenuModal
				openMenu={openMenu}
				nature={nature}
				onClose={() => setOpenMenu(false)}
			/>
		</section>
	);
}

{
	/* --------------------- Horaires ---------------------
<div
	className="grid gap-2 gap-x-4 text-center
	max-sm:grid-cols-1
	sm:grid-cols-2 sm:grid-rows-[auto_repeat(3,auto)] sm:grid-flow-col sm:text-left
	lg:grid-cols-3 lg:grid-rows-[auto_repeat(2,auto)] lg:grid-flow-row lg:px-6 lg:place-self-center lg:justify-items-center
	"
>
	<h2
		className="text-2xl font-body justify-self-center pb-4
	sm:col-span-2 sm:row-start-1
	lg:col-span-3
	"
	>
		Les horaires
	</h2>
	<ul className="contents text-base">
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
</div> */
}
