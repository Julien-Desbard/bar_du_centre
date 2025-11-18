"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import ReservationModal from "../modals/reservationModal";
import MenuModal from "../modals/menuModal";
import { useState } from "react";
import CategoryCarte from "../lists/categoryCarte";
import { CarteItems, MenuItem } from "@/@types";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

type MenuProps = {
	carteData: CarteItems[];
	platsMenu: MenuItem[];
	boissonsMenu: MenuItem[];
};

export default function Menu({ carteData, platsMenu, boissonsMenu }: MenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [nature, setNature] = useState<"plats" | "boissons">("plats");



	const entrees = carteData.filter((i) => i.categorie === "Entrées");
	const plats = carteData.filter((i) => i.categorie === "Plats");
	const desserts = carteData.filter((i) => i.categorie === "Desserts");

	const sectionTitle: SectionTitleProps = {
		part1: "Le Bar",
		part2: "Du Centre",
	};

	// Sélectionner les bonnes données selon la nature
	const currentMenuItems = nature === "plats" ? platsMenu : boissonsMenu;

	return (
		<section
			id="menu"
			className="snap-start relative text-white overflow-hidden max-sm:pt-6 pt-18"
		>
			<SectionTitle sectionTitle={sectionTitle} />

			<div className="w-full h-full mx-auto flex flex-row flex-wrap justify-around gap-x-3 lg:flex-1 xl:gap-x-12">
				{/* --------------------- Menu --------------------- */}
				<div className="flex flex-col items-center justify-center mt-12 max-lg:px-6 lg:w-fit">
					<div className="flex flex-col items-center max-sm:gap-y-6 sm:grid sm:grid-cols-2 sm:grid-rows-2">
						<h2
							onClick={() => (setOpenMenu(true), setNature("plats"))}
							className="font-subtitle text-4xl text-center text-white max-sm:text-left sm:col-start-1 sm:row-start-1 sm:self-center cursor-pointer"
						>
							Menu de <br />
							<span className="text-secondary">la cantine</span>
						</h2>
						<Image
							className="max-sm:hidden sm:col-start-2 sm:row-start-1 sm:justify-self-center cursor-pointer"
							src="/images/burger_icon.png"
							alt="icone burger pour accéder au menu des plats"
							width={250}
							height={250}
							onClick={() => (setOpenMenu(true), setNature("plats"))}
						/>
						<Image
							className="max-sm:hidden sm:col-start-1 sm:row-start-2 sm:justify-self-center cursor-pointer"
							src="/images/beer_icon.png"
							alt="icone bière pour accéder au menu des boissons"
							width={250}
							height={250}
							onClick={() => (setOpenMenu(true), setNature("boissons"))}
						/>
						<h2
							onClick={() => (setOpenMenu(true), setNature("boissons"))}
							className="font-subtitle text-4xl text-center text-white max-sm:text-left sm:col-start-2 sm:row-start-2 sm:self-center cursor-pointer"
						>
							Carte des <br />
							<span className="text-secondary">boissons</span>
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
				<div className="flex flex-col items-center gap-2 max-w-full w-fit justify-self-center lg:mt-28 px-3">
					<h2 className="font-subtitle text-4xl text-center">Carte du jour</h2>

					<CategoryCarte items={entrees} />
					<CategoryCarte items={plats} />
					<CategoryCarte items={desserts} />

					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-6 mb-12 lg:hidden"
					>
						Réserver une table
					</Button>
				</div>

				{/* Button desktop */}
				<div className="w-full flex justify-center max-lg:hidden m-6 mb-12">
					<Button onClick={() => setIsOpen(true)} className="max-w-45">
						Réserver une table
					</Button>
				</div>
			</div>
			<ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<MenuModal
				openMenu={openMenu}
				nature={nature}
				menuItems={currentMenuItems}
				onClose={() => setOpenMenu(false)}
			/>
		</section>
	);
}