"use client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

export type CarteItems = {
	id: number;
	categorie: string;
	name: string;
	prix: string;
};

export default function CarteAdmin() {
	const [carteItems, setcarteItems] = useState<CarteItems[]>([]);
	const [id, setId] = useState<number | undefined>(undefined);
	const [name, setName] = useState("");
	const [categorie, setCategorie] = useState("");
	const [prix, setPrix] = useState("");

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	useEffect(() => {
		async function getCarteItems() {
			try {
				const httpResponse = await fetch(`http://localhost:3001/api/carte`);
				const data = await httpResponse.json();

				if (httpResponse.ok) {
					setcarteItems(data.allCarteItems);
				} else {
					throw new Error("L'appel à l'API a échoué, veuillez réessayer...");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getCarteItems();
	}, []);

	return (
		<div className="text-white flex flex-col w-full min-h-screen max-sm:overflow-visible">
			<div className="flex flex-row justify-around p-6">
				<h3 className="text-5xl text-white font-subtitle font-light text-center">
					Administration de la{" "}
					<span className="text-secondary">CARTE DU JOUR</span>
				</h3>
			</div>
			<div className="justify-self-center">
				<div className="mb-8">
					<div className="px-3 w-full">
						<div>
							<div>
								<div className="grid grid-cols-[minmax(75px,1fr)_minmax(200px,3fr)_70px_28px_28px] gap-2 font-bold">
									<div>Catégorie</div>
									<div>Nom</div>
									<div className="text-center">Prix</div>
								</div>
							</div>
							{carteItems?.map((item, index) => {
								return (
									<div
										key={item.id}
										className="grid grid-cols-[minmax(75px,1fr)_minmax(200px,3fr)_70px_28px_28px] gap-2 py-1"
									>
										<input
											type="text"
											name="categorie"
											value={item.categorie}
											className="border border-secondary p-2 bg-transparent text-white"
											readOnly
										/>
										<input
											type="text"
											name="nom"
											value={item.name}
											className="border border-secondary p-2 bg-transparent text-white"
											readOnly
										/>{" "}
										<input
											type="text"
											name="prix"
											value={item.prix}
											className="border border-secondary p-2 bg-transparent text-white"
											readOnly
										/>
										<button
											type="button"
											onClick={() => {
												setOpenEdit(true);
												setId(item.id);
												setName(item.name);
												setCategorie(item.categorie);
												setPrix(item.prix);
											}}
											className="flex items-center justify-center"
										>
											<Edit className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors duration-300" />
										</button>
										<button
											type="button"
											onClick={() => {
												setOpenDelete(true);
												setId(item.id);
												setName(item.name);
											}}
											className="flex items-center justify-center"
										>
											<Trash className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors duration-300" />
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="flex self-center">
				<Button onClick={() => setOpenCreate(true)}>
					Créer un élement de menu
				</Button>
			</div>
		</div>
	);
}
