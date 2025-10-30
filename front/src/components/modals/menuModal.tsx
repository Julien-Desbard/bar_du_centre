"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import Link from "next/link";

interface Modalprops {
	openMenu: boolean;
	nature: string;
	onClose: () => void;
}

export type MenuItem = {
	id: number;
	cat1: string;
	name: string;
	cat2?: string | null;
	cat3?: string | null;
	description?: string | null;

	price_1_boule?: string | null;
	price_2_boules?: string | null;
	prix_unique?: string | null;
	petit?: string | null;
	grand?: string | null;
	demi?: string | null;
	pinte?: string | null;
	verre?: string | null;
	bouteille?: string | null;
	cl_25?: string | null;
	cl_50?: string | null;
	l_1?: string | null;

	bio?: string | null;
	contenance?: string | null;
	titrage?: string | null;
};

// Fonction helper pour récupérer le prix à afficher
function getPrixDisplay(item: MenuItem): string {
	// Ordre de priorité des prix
	if (item.prix_unique) return `${item.prix_unique}€`;
	if (item.petit && item.grand) return `${item.petit}€ / ${item.grand}€`;
	if (item.demi && item.pinte)
		return `Demi ${item.demi}€ / Pinte ${item.pinte}€`;
	if (item.verre && item.bouteille)
		return `Verre ${item.verre}€ / Bout. ${item.bouteille}€`;
	if (item.price_1_boule && item.price_2_boules)
		return `1B ${item.price_1_boule}€ / 2B ${item.price_2_boules}€`;
	if (item.cl_25) return `${item.cl_25}€`;

	return "Prix non disponible";
}

export default function Modal({ openMenu, nature, onClose }: Modalprops) {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		if (!openMenu) return;

		async function getMenuItems() {
			try {
				const httpResponse = await fetch(
					`http://localhost:3001/api/menu/cat/${nature}`
				);
				const data = await httpResponse.json();
				console.log(data);
				if (httpResponse.ok) {
					setMenuItems(data.menuItemsPerCat1);
				} else {
					throw new Error("L'appel à l'API a échoué, veuillez réessayer...");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getMenuItems();
	}, [openMenu]);

	if (!openMenu) return null;

	// Récupérer les catégories 2 uniques
	const itemsCat2 = [...new Set(menuItems.map((item) => item.cat2))].filter(
		Boolean
	);

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={() => onClose()}
		>
			<div
				className="bg-[url('/images/background.jpg')] bg-cover bg-center w-full max-w-xl max-sm:h-full sm:max-h-[85%] shadow-lg text-white font-body flex flex-col"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{/* HEADER */}
				<div className="flex-shrink-0 m-3">
					<div className="justify-self-end">
						<button
							type="button"
							aria-label="Fermer le menu"
							className="hover:text-secondary transition-colors duration-300 ease-in-out"
						>
							<XIcon onClick={() => onClose()} className="w-6 h-6" />
						</button>
					</div>
					<h3 className="text-2xl text-white font-subtitle font-light justify-self-center pb-6">
						Les {nature} du <span className="text-secondary">BDC</span>
					</h3>
					<div className="font-body">
						<div className="border-b border-secondary">
							<ul className="flex flex-row flex-wrap justify-center gap-3 pb-3 scroll-smooth">
								{itemsCat2.map((cat2) => {
									if (!cat2) return null;
									const safeId = cat2.replace(/\s+/g, "").toLowerCase();
									return (
										<li
											key={safeId}
											className="hover:text-secondary transition-colors duration-300 ease-in-out cursor-pointer"
											onClick={() => {
												const element = document.getElementById(safeId);
												element?.scrollIntoView({
													behavior: "smooth",
													block: "start",
												});
											}}
										>
											{cat2}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>

				{/* CONTENU SCROLLABLE */}
				<div className="flex-1 min-h-0 overflow-y-auto px-6 pb-3 scroll-smooth ">
					{itemsCat2.map((cat2) => {
						if (!cat2) return null;
						const safeId = cat2.replace(/\s+/g, "").toLowerCase();
						return (
							<div key={safeId} id={safeId}>
								<h4 className="text-secondary border-b border-white my-3 font-semibold text-center max-w-[80%] flex justify-self-center">
									{cat2}
								</h4>
								<ul className="w-full space-y-2">
									{menuItems
										.filter((item) => item.cat2 === cat2)
										.map((item) => (
											<li key={item.id} className="flex items-baseline gap-2">
												<div className="break-words">
													{item.name}
													{/* {item.description && (
														<small className="text-xs text-gray-300 italic block">
															{item.description}
														</small>
													)} */}
												</div>
												<div className="flex-shrink-0 border-b border-dotted border-white/80 flex-2 mb-1" />
												<div className="shrink-0 text-bg">
													{getPrixDisplay(item)}
												</div>
											</li>
										))}
								</ul>
							</div>
						);
					})}
				</div>

				<div className="flex justify-center border-t border-secondary mt-3">
					<Button className="m-6">Menu en pdf</Button>
				</div>
			</div>
		</div>
	);
}
