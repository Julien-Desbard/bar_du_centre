"use client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AdminModalUpdate from "@/components/modals/admin/adminModalUpdate";
import AdminModalDelete from "@/components/modals/admin/adminModalDelete";
import AdminModalCreate from "../../modals/admin/adminModalCreate";
import { Button } from "../../ui/button";

export type MenuItem = {
	id: number;
	cat1: string;
	cat2?: string | "";
	slug_cat2?: string | "";
	cat3?: string | "";
	name: string;
	description?: string | "";
	intitule?: string | "";
	prix_1?: string | "";
	prix_2?: string | "";
	prix_3?: string | "";
};

export default function MenuAdmin() {
	const [isOpen, setIsOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	const [activeSafeid, setActiveSafeid] = useState<string>("lechaud");

	const [name, setName] = useState("");
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [price_1, setPrice_1] = useState<string | undefined>(undefined);
	const [price_3, setPrice_3] = useState<string | undefined>(undefined);
	const [price_2, setPrice_2] = useState<string | undefined>(undefined);
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [category, setCategory] = useState("le_chaud");
	const [categoryName, setCategoryName] = useState("Le chaud");
	const [categoryDetail, setCategoryDetail] = useState<MenuItem[] | undefined>(
		undefined
	);
	const [id, setId] = useState<number | undefined>(undefined);

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
	}, [isOpen, openCreate, openDelete]);

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
	}, [category, isOpen, openDelete, openCreate]);

	const drinks = [
		...new Set(
			menuItems
				.filter((item) => item.cat1 === "boissons")
				.map((item) => item.cat2)
		),
	].filter(Boolean);

	const food = [
		...new Set(
			menuItems.filter((item) => item.cat1 === "plats").map((item) => item.cat2)
		),
	].filter(Boolean);

	// Vérifier si la catégorie contient des cat3
	const hasCat3 = categoryDetail?.some((item) => item.cat3 && item.cat3.trim() !== "");

	return (
		<div className="text-white pt-24 flex flex-col w-full min-h-screen max-sm:overflow-visible">
			<div className="flex flex-row justify-around p-6">
				<h3 className="text-5xl text-white font-subtitle font-light text-center">
					Administration du{" "}
					<span className="text-secondary">MENU</span>
				</h3>
			</div>
			<div className="border-b border-t border-secondary m-3">
				<div className="flex flex-row border-b border-white">
					<h4 className="text-2xl text-secondary text-center m-3 flex-1 self-center">
						Les boissons
					</h4>
					<ul className="flex flex-row flex-wrap gap-3 m-3 flex-3 justify-start">
						{drinks.map((cat2) => {
							if (!cat2) return null;
							const safeId = cat2.replace(/\s+/g, "").toLowerCase();
							return (
								<li
									key={safeId}
									className={`text-xl hover:text-secondary transition-colors duration-300 ease-in-out cursor-pointer ${
										activeSafeid === safeId
											? "text-secondary  font-semibold"
											: ""
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
				<div className="flex flex-row ">
					<h4 className="text-2xl text-secondary text-center m-3 flex-1 self-center">
						Les plats
					</h4>
					<ul className="flex flex-row flex-wrap gap-3 m-3 flex-3 justify-start">
						{food.map((cat2) => {
							if (!cat2) return null;
							const safeId = cat2.replace(/\s+/g, "").toLowerCase();
							return (
								<li
									key={safeId}
									className={`text-xl hover:text-secondary transition-colors duration-300 ease-in-out cursor-pointer ${
										activeSafeid === safeId
											? "text-secondary  font-semibold"
											: ""
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
			</div>

			<div className="justify-self-center">
				<div className="mb-8">
					<h4 className="text-secondary text-xl my-2 pb-1 font-semibold text-center max-w-[80%] mx-auto">
						{categoryName}
					</h4>
					<div className="px-3 w-full">
						{/* Afficher les en-têtes seulement s'il n'y a PAS de cat3 */}
						{!hasCat3 && (
							<div className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_70px_70px_70px_28px_28px] gap-2 font-bold">
								<div>Nom</div>
								<div>Description</div>
								<div className="text-center">Prix 1</div>
								<div className="text-center">Prix 2</div>
								<div className="text-center">Prix 3</div>
							</div>
						)}
						
						{categoryDetail?.map((item, index) => {
							// On récupère la cat3 de l'item précédent pour comparer
							const previousItem = index > 0 ? categoryDetail[index - 1] : null;
							const showCat3Title =
								item.cat3 && item.cat3 !== previousItem?.cat3;

							return (
								<div key={item.id}>
									{/* Affiche le titre cat3 et les en-têtes seulement si c'est un nouveau groupe */}
									{showCat3Title && (
										<div>
											<h5 className="text-secondary text-lg font-semibold mb-2 mt-4 text-start">
												{item.cat3}
											</h5>
											<div className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_70px_70px_70px_28px_28px] gap-2 font-bold">
												<div>Nom</div>
												<div>Description</div>
												<div className="text-center">Prix 1</div>
												<div className="text-center">Prix 2</div>
												<div className="text-center">Prix 3</div>
											</div>
										</div>
									)}

									<div className="grid grid-cols-[minmax(150px,2fr)_minmax(200px,3fr)_70px_70px_70px_28px_28px] gap-2 py-1">
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
											name="Prix 1"
											value={`${item.prix_1} €`}
											className="border border-secondary p-2 bg-transparent text-white text-center"
											readOnly
										/>
										<input
											type="text"
											name="Prix 2"
											value={item.prix_2 ? `${item.prix_2} €` : ""}
											className="border border-secondary p-2 bg-transparent text-white text-center"
											readOnly
										/>
										<input
											type="text"
											name="Prix 3"
											value={item.prix_3 ? `${item.prix_3} €` : ""}
											className="border border-secondary p-2 bg-transparent text-white text-center"
											readOnly
										/>
										<button
											type="button"
											onClick={() => {
												setIsOpen(true);
												setId(item.id);
												setName(item.name);
												setDescription(item.description);
												setPrice_1(item.prix_1);
												setPrice_2(item.prix_2);
												setPrice_3(item.prix_3);
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
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="flex self-center mb-8">
				<Button onClick={() => setOpenCreate(true)}>
					Créer un élement de menu
				</Button>
			</div>
			<AdminModalUpdate
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				id={id}
				name={name}
				description={description}
				price_1={price_1}
				price_2={price_2}
				price_3={price_3}
			/>
			<AdminModalDelete
				isOpen={openDelete}
				onClose={() => setOpenDelete(false)}
				id={id}
				name={name}
			/>
			<AdminModalCreate
				isOpen={openCreate}
				onClose={() => setOpenCreate(false)}
				menuItems={menuItems}
			/>
		</div>
	);
}