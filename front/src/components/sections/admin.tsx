"use client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AdminModal from "@/components/modals/adminModal";

export const plats = [
	{
		id: 1,
		name: "Burger du Centre",
		description: "Bœuf, cheddar affiné, oignons confits, sauce maison",
		price_1: 14,
		price_2: 17,
	},
	{
		id: 2,
		name: "Tartare de saumon frais",
		description: "Mariné au citron vert, ciboulette et baies roses",
		price_1: 13,
		price_2: 16,
	},
	{
		id: 3,
		name: "Salade César",
		description: "Poulet grillé, parmesan, croûtons et sauce César",
		price_1: 11,
		price_2: 14,
	},
	{
		id: 4,
		name: "Entrecôte grillée",
		description: "250 g de viande française, beurre maître d’hôtel",
		price_1: 19,
		price_2: 23,
	},
	{
		id: 5,
		name: "Fish & Chips maison",
		description: "Cabillaud frais, pâte légère, frites et sauce tartare",
		price_1: 15,
		price_2: 18,
	},
	{
		id: 6,
		name: "Pâtes au pesto rouge",
		description: "Penne, tomates séchées, pignons, parmesan et basilic",
		price_1: 12,
		price_2: 15,
	},
];

export type MenuItem = {
	id: number;
	cat1: string;
	name: string;
	cat2?: string | "";
	cat3?: string | "";
	description?: string | "";
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

	bio?: string | "";
	contenance?: string | "";
	titrage?: string | "";
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

export default function MenuAdmin() {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [price_1, setPrice_1] = useState<number | undefined>(undefined);
	const [price_2, setPrice_2] = useState<number | undefined>(undefined);
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		async function getFoodItems() {
			try {
				const httpResponse = await fetch(`http://localhost:3001/api/menu`);
				const data = await httpResponse.json();

				if (httpResponse.ok) {
					setMenuItems(data.allMenuItems);
				} else {
					throw new Error("L'appel à l'API a échoué, veuillez réessayer...");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getFoodItems();
	}, []);

	const itemsCat2 = [...new Set(menuItems.map((item) => item.cat2))].filter(
		Boolean
	);

	return (
		<div className="text-white pt-24 flex flex-col w-full min-h-screen m-3">
			<div className="border-b border-secondary">
				<h3 className="text-2xl text-white font-subtitle font-light justify-self-center pb-6 text-center">
					Console d&apos;administration du{" "}
					<span className="text-secondary">MENU</span>
				</h3>
				<ul className="flex flex-row flex-wrap gap-6 justify-center ">
					{itemsCat2.map((cat2) => {
						if (!cat2) return null;
						const safeId = cat2.replace(/\s+/g, "").toLowerCase();
						return (
							<li
								key={safeId}
								className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out"
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
			<div className="justify-self-center">
{itemsCat2.map((cat2) => {
	if (!cat2) return null;
	const safeId = cat2.replace(/\s+/g, "").toLowerCase();
	return (
		<div key={safeId} id={safeId} className="mb-8">
			<h4 className="text-secondary  my-2 pb-1 font-semibold text-center max-w-[80%] mx-auto">
				{cat2}
			</h4>
			
			{/* TABLE STRUCTURE */}
			<div className="px-6 w-full">
				{/* EN-TÊTES */}
				<div className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_100px_100px_28px_28px] gap-2 font-bold py-3 border-b border-gray-600">
					<div>Nom du plat</div>
					<div>Description</div>
					<div>Prix n°1</div>
					<div>Prix n°2</div>
					<div></div>
					<div></div>
				</div>

				{/* LIGNES DE DONNÉES */}
				{menuItems
					.filter((item) => item.cat2 === cat2)
					.map((item) => (
						<div key={item.id} className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_100px_100px_28px_28px] gap-2 py-2 border-b border-gray-700/50">
							<input
								type="text"
								value={item.name}
								className="border border-secondary p-2 bg-transparent text-white"
								readOnly
							/>
							<input
								type="text"
								value={item.description || ''}
								className="border border-secondary p-2 bg-transparent text-white"
								readOnly
							/>
							<input
								type="text"
								value={getPrixDisplay(item)}
								className="border border-secondary p-2 bg-transparent text-white"
								readOnly
							/>
							<input
								type="text"
								value={getPrixDisplay(item)}
								className="border border-secondary p-2 bg-transparent text-white"
								readOnly
							/>
							<button
								type="button"
								onClick={() => {
									setIsOpen(true);
									setName(item.name);
									setDescription(item.description);
								}}
								className="flex items-center justify-center"
							>
								<Edit className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors duration-300" />
							</button>
							<button type="button" className="flex items-center justify-center">
								<Trash className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors duration-300" />
							</button>
						</div>
					))}
			</div>
		</div>
	);
})}
			</div>
			<AdminModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				name={name}
				description={description}
				price_1={price_1}
				price_2={price_2}
			/>
		</div>
	);
}
