"use client";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
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

export default function MenuAdmin() {
	const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price_1, setPrice_1] = useState<number | undefined>(undefined)
    const [price_2, setPrice_2] = useState<number | undefined>(undefined)


	return (
		<div className="text-white pt-24 flex flex-col w-full min-h-screen">
			<div>
				<h3 className="text-2xl text-white font-subtitle font-light justify-self-center pb-6 text-center">
					Console d&apos;administration du{" "}
					<span className="text-secondary">MENU</span>
				</h3>
				<ul className="flex flex-row flex-wrap gap-6 justify-center ">
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
					<li className="text-xl hover:text-secondary transition-colors duration-300 ease-in-out">
						Catégorie
					</li>
				</ul>
			</div>
			<div className="justify-self-center">
				<h4 className="text-secondary border-b border-white my-2 pb-1 font-semibold text-center max-w-[80%] flex justify-self-center ">
					Nom de la sous-catégorie
				</h4>
				<div className="justify-self-center px-6 py-2 w-full">
					{plats.map((plat) => (
						<form key={plat.id}>
							<div className="flex flex-row flex-wrap gap-2 w-full">
								<div className="flex flex-col flex-2">
									<label className="p-1" htmlFor="name">
										Nom du plat
									</label>
									<input
										type="text"
										name={plat.name}
										value={plat.name}
										className="border border-secondary p-1"
									/>
								</div>
								<div className="flex flex-col flex-3">
									<label className="p-1" htmlFor="description">
										Déscription du plat
									</label>
									<input
										type="text"
										name={plat.description}
										value={plat.description}
										className="border border-secondary p-1"
									/>
								</div>
								<div className="flex flex-col flex-1">
									<label className="p-1" htmlFor="prix_1">
										Prix n°1
									</label>
									<input
										type="number"
										name="prix_1"
										value={plat.price_1}
										className="border border-secondary p-1"
									/>
								</div>
								<div className="flex flex-col flex-1">
									<label className="p-1" htmlFor="prix_2">
										Prix n°2
									</label>
									<input
										type="number"
										name="prix_2"
										value={plat.price_2}
										className="border border-secondary p-1"
									/>
								</div>
								<Edit
									className="self-end mb-2  hover:text-secondary transition-colors duration-300 ease-in-out"
									onClick={() => {
                                        setIsOpen(true);
                                        setName(plat.name)
                                        setDescription(plat.description)
                                        setPrice_1(plat.price_1)
                                        setPrice_2(plat.price_2)
                                    }}
								/>
								<Trash className="self-end mb-2  hover:text-secondary transition-colors duration-300 ease-in-out" />
							</div>
						</form>
					))}
				</div>
			</div>
			<AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} name={name} description={description} price_1={price_1} price_2={price_2}/>
		</div>
	);
}
