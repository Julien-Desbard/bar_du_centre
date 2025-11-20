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

export default function Menu({
	carteData,
	platsMenu,
	boissonsMenu,
}: MenuProps) {
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

			<div className="w-full h-full mx-auto flex flex-row flex-wrap justify-around gap-x-3 lg:flex-1 xl:gap-x-12 xl:mt-12">
				{/* --------------------- Menu --------------------- */}
					{/* < className=" mt-12 max-lg:px-6 lg:w-fit flex flex-col items-center max-sm:gap-y-6 sm:grid sm:grid-cols-2 sm:grid-rows-2"> */}
				<div className="mt-12 flex flex-col gap-6 ">
					<div className="flex gap-6 items-center">
						<Image
							className="font-bold"
							src="/images/arrow_forward.png"
							alt="fleche vers la droite pour mettre en évidence le lien cliquable du menu"
							width={60}
							height={60}
						/>
						<h2
							onClick={() => (setOpenMenu(true), setNature("plats"))}
							className="font-subtitle text-4xl text-left text-white max-sm:text-left sm:col-start-1 sm:row-start-1 sm:self-center cursor-pointer"
						>
							Menu de <br />
							<span className="text-secondary font-subtitle text-6xl border-b-4 border-secondary font-bold">
								la Cantine
							</span>
						</h2>
						<Image
							className="max-sm:hidden cursor-pointer pb-2"
							src="/images/burger_icon.png"
							alt="icone burger pour accéder au menu des plats"
							width={170
							}
							height={170
							}
							onClick={() => (setOpenMenu(true), setNature("plats"))}
						/>
					</div>
					<div className="flex gap-6 items-center">
						<Image
							className="font-bold"
							src="/images/arrow_forward.png"
							alt="fleche vers la droite pour mettre en évidence le lien cliquable du menu"
							width={60}
							height={60}
						/>
						<Image
							className="max-sm:hidden cursor-pointer pb-2"
							src="/images/beer_icon.png"
							alt="icone bière pour accéder au menu des boissons"
							width={170
							}
							height={170
							}
							onClick={() => (setOpenMenu(true), setNature("boissons"))}
						/>
						<h2
							onClick={() => (setOpenMenu(true), setNature("boissons"))}
							className="font-subtitle text-4xl text-left text-white max-sm:text-left sm:col-start-2 sm:row-start-2 sm:self-center cursor-pointer"
						>
							Carte des <br />
							<span className="text-secondary font-subtitle text-6xl border-b-4 border-secondary font-bold">
								Boissons
							</span>
						</h2>
					</div>
					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mb-12 self-center lg:hidden"
					>
						Réserver une table
					</Button>
				</div>

				{/* --------------------- Carte du jour --------------------- */}
				<div className="flex flex-col items-center gap-2 max-w-full w-fit justify-self-center lg:mt-16 px-3">
					<h2 className="font-subtitle text-4xl text-center">Carte du jour</h2>

					<CategoryCarte items={entrees} />
					<CategoryCarte items={plats} />
					<CategoryCarte items={desserts} />

					<Button
						onClick={() => setIsOpen(true)}
						className="max-w-45 mt-6 mb-12 lg:hidden "
					>
						Réserver une table
					</Button>
				</div>

				{/* Button desktop */}
				<div className="w-full flex justify-center max-lg:hidden my-12 2xl:mt-18">
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
