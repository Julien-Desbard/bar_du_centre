"use client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AdminModal from "@/components/modals/adminModal";
import AdminModalDelete from "@/components/modals/adminModalDelete";
import SignOffButton from "../buttons/signOffButton";

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

// Fonction qui retourne les noms de colonnes ET les valeurs
function getPrixAvecColonnes(item: MenuItem): {
	prix1: string;
	prix2: string;
	colonne1: string;
	colonne2: string;
} {
	const colonnesPrix = [
		"prix_unique",
		"petit",
		"grand",
		"demi",
		"pinte",
		"verre",
		"bouteille",
		"price_1_boule",
		"price_2_boules",
		"cl_25",
		"cl_50",
		"l_1",
	];

	// Trouver les colonnes remplies avec leurs valeurs
	const prixRemplis = colonnesPrix
		.map((colonne) => ({
			nomColonne: colonne,
			valeur: item[colonne as keyof MenuItem],
		}))
		.filter(
			({ valeur }) => valeur !== null && valeur !== "" && valeur !== undefined
		);

	return {
		prix1: (prixRemplis[0]?.valeur as string) || "",
		prix2: (prixRemplis[1]?.valeur as string) || "",
		colonne1: prixRemplis[0]?.nomColonne || "",
		colonne2: prixRemplis[1]?.nomColonne || "",
	};
}

export default function MenuAdmin() {
	const [isOpen, setIsOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [activeSafeid, setActiveSafeid] = useState<string | undefined>(
		undefined
	);

	const [name, setName] = useState("");
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [price_1, setPrice_1] = useState<string | undefined>(undefined);
	const [price_2, setPrice_2] = useState<string | undefined>(undefined);
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [category, setCategory] = useState("bières");
	const [categoryName, setCategoryName] = useState("");
	const [categoryDetail, setCategoryDetail] = useState<MenuItem[] | undefined>(
		undefined
	);
	const [id, setId] = useState<number | undefined>(undefined);
	const [nomColonne1, setNomColonne1] = useState<string | undefined>(undefined);
	const [nomColonne2, setNomColonne2] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function getMenuCategories() {
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
		getMenuCategories();
	}, []);

	useEffect(() => {
		async function getCategoryContent() {
			try {
				const httpResponse = await fetch(
					`http://localhost:3001/api/menu/cat2/${category}`
				);
				const data = await httpResponse.json();
				if (httpResponse.ok) {
					setCategoryDetail(data.menuItemsPerSlugCat2);
				} else {
					throw new Error("L'appel à l'API a échoué, veuillez réessayer...");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getCategoryContent();
	}, [category, isOpen, openDelete]);

	const itemsCat2 = [...new Set(menuItems.map((item) => item.cat2))].filter(
		Boolean
	);

	return (
		<div className="text-white pt-24 flex flex-col w-full min-h-screen max-sm:overflow-visible">
			<div className="flex flex-row justify-around mx-3">
				<h3 className="text-2xl text-white font-subtitle font-light justify-self-center text-center mr-auto">
					Console d&apos;administration du{" "}
					<span className="text-secondary">MENU</span>
				</h3>
				<SignOffButton />
			</div>
			<div className="border-b border-t border-secondary m-3 p-3">
				<h4 className="text-2xl text-secondary text-center m-3">Catégories</h4>
				<ul className="flex flex-row flex-wrap gap-6 justify-center m-3">
					{itemsCat2.map((cat2) => {
						if (!cat2) return null;
						const safeId = cat2.replace(/\s+/g, "").toLowerCase();
						return (
							<li
								key={safeId}
								className={`text-xl hover:text-secondary transition-colors duration-300 ease-in-out cursor-pointer ${
									activeSafeid === safeId ? "text-secondary  font-semibold" : ""
								}`}
								onClick={() => {
									setCategory(cat2.replace(/\s+/g, "_").toLowerCase());
									setCategoryName(cat2);
									setActiveSafeid(safeId);
								}}
							>
								{cat2}
							</li>
						);
					})}
				</ul>
			</div>
			<div className="justify-self-center">
				<div className="mb-8">
					<h4 className="text-secondary text-xl my-2 pb-1 font-semibold text-center max-w-[80%] mx-auto">
						{categoryName}
					</h4>
					<div className="px-3 w-full">
						<div className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_100px_100px_28px_28px] gap-2 font-bold">
							<div>Nom du plat</div>
							<div>Description</div>
							<div>Prix 1</div>
							<div>Prix 2</div>
							<div></div>
							<div></div>
						</div>
						{categoryDetail?.map((item) => {
							const { prix1, prix2, colonne1, colonne2 } =
								getPrixAvecColonnes(item);

							return (
								<div
									key={item.id}
									className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_100px_100px_28px_28px] gap-2 py-2 border-b border-gray-700/50"
								>
									<input
										type="text"
										value={item.name}
										className="border border-secondary p-2 bg-transparent text-white"
										readOnly
									/>
									<input
										type="text"
										value={item.description || ""}
										className="border border-secondary p-2 bg-transparent text-white"
										readOnly
									/>
									<input
										type="text"
										name={colonne1 ? `${colonne1}` : "-"}
										value={prix1 ? `${prix1}€` : "-"}
										className="border border-secondary p-2 bg-transparent text-white"
										readOnly
									/>
									<input
										type="text"
										name={colonne2 ? `${colonne2}` : "-"}
										value={prix2 ? `${prix2}€` : "-"}
										className="border border-secondary p-2 bg-transparent text-white"
										readOnly
									/>
									<button
										type="button"
										onClick={() => {
											setIsOpen(true);
											setId(item.id);
											setName(item.name);
											setDescription(item.description);
											setPrice_1(prix1);
											setPrice_2(prix2);
											setNomColonne1(colonne1);
											setNomColonne2(colonne2);
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
			<AdminModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				id={id}
				name={name}
				description={description}
				price_1={price_1}
				price_2={price_2}
				colonne1={nomColonne1}
				colonne2={nomColonne2}
			/>
			<AdminModalDelete
				isOpen={openDelete}
				onClose={() => setOpenDelete(false)}
				id={id}
				name={name}
			/>
		</div>
	);
}
