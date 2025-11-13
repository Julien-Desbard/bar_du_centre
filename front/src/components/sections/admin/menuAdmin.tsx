"use client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import GenericModal from "@/components/modals/genericModal";
import AdminDrinksList from "@/components/lists/adminDrinksList";
import AdminFoodList from "@/components/lists/adminFoodList";

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
	// generic Modal states
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");

	// Delete modal state
	const [openDelete, setOpenDelete] = useState(false);

	// Create modal state
	const [openCreate, setOpenCreate] = useState(false);

	// Update + create modal states
	const [openEdit, setOpenEdit] = useState(false);
	const [localName, setLocalName] = useState<string>("");
	const [localDescription, setLocalDescription] = useState<string>("");
	const [localPrice_1, setLocalPrice_1] = useState<string>("");
	const [localPrice_2, setLocalPrice_2] = useState<string>("");
	const [localPrice_3, setLocalPrice_3] = useState<string>("");
	const [localCat1, setLocalCat1] = useState<string>("");
	const [localCat2, setLocalCat2] = useState<string>("");
	const [localCat3, setLocalCat3] = useState<string>("");
	const [localSlugCat2, setLocalSlugCat2] = useState<string>("");

	const [activeSafeid, setActiveSafeid] = useState<string>("lechaud");
	const [name, setName] = useState("");
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [category, setCategory] = useState("le_chaud");
	const [categoryName, setCategoryName] = useState("Le chaud");
	const [categoryDetail, setCategoryDetail] = useState<MenuItem[] | undefined>(
		undefined
	);
	const [id, setId] = useState<number | undefined>(undefined);

	const [dataVersion, setDataVersion] = useState(0);

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
	}, [dataVersion]);

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
	}, [category, dataVersion]);

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
	const hasCat3 = categoryDetail?.some(
		(item) => item.cat3 && item.cat3.trim() !== ""
	);

	const resetAllModalStatesAndClose = () => {
		// 1. Fermeture des modales
		setOpenEdit(false);
		setOpenCreate(false);
		setOpenDelete(false);

		// 2. Réinitialisation des states temporaires liés à l'élément sélectionné
		setId(undefined);

		// 3. Réinitialisation des states locaux du formulaire (local...)
		setLocalName("");
		setLocalDescription("");
		setLocalPrice_1("");
		setLocalPrice_2("");
		setLocalPrice_3("");
		setLocalCat1("");
		setLocalCat2("");
		setLocalCat3("");
		setLocalSlugCat2("");

		// 4. Réinitialisation des messages de feedback/erreur
		setErrors("");
		setMessageSuccess("");
	};

	// ========================= Modal UseEffects =================

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessageSuccess("");
		}, 5000);
		return () => clearTimeout(timer);
	}, [messageSuccess]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrors("");
		}, 5000);
		return () => clearTimeout(timer);
	}, [errors]);

	// ========================= Update modal =================

	async function handleEdit() {
		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/menu/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: localName,
					description: localDescription,
					prix_1: localPrice_1 ? Number(localPrice_1) : null,
					prix_2: localPrice_2 ? Number(localPrice_2) : null,
					prix_3: localPrice_3 ? Number(localPrice_3) : null,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				console.log(
					"Voici les data de la mise à jour : ",
					JSON.stringify(data, null, 2)
				);
			}
			setMessageSuccess("Mise à jour réalisée avec succès");
			setTimeout(() => setOpenEdit(false), 3000);
			setDataVersion((prev) => prev + 1);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	// ========================= Create modal =================

	const resetFormLocalStates = () => {
		setLocalCat1("");
		setLocalCat2("");
		setLocalCat3("");
		setLocalDescription("");
		setLocalName("");
		setLocalPrice_1("");
		setLocalPrice_2("");
		setLocalPrice_3("");
	};
	const checkAllFieldsAreFilled = () => {
		if (!localCat1 || !localCat2 || !localName || !localPrice_1)
			return {
				ok: false,
				msg: "Pour ajouter un élement au menu, vous devez renseigner tous les champs obligatoires",
			};

		return {
			ok: true,
			msg: "",
		};
	};

	async function handleCreate() {
		const fieldCheck = checkAllFieldsAreFilled();
		if (!fieldCheck.ok) {
			setErrors(fieldCheck.msg);
			return;
		}

		setLocalSlugCat2(localCat2.replace(/\s+/g, "_").toLowerCase());

		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/menu`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: localName,
					description: localDescription,
					cat1: localCat1,
					cat2: localCat2,
					cat3: localCat3,
					slug_cat2: localCat2.replace(/\s+/g, "_").toLowerCase(),
					prix_1: localPrice_1 ? Number(localPrice_1) : undefined,
					prix_2: localPrice_2 ? Number(localPrice_2) : undefined,
					prix_3: localPrice_3 ? Number(localPrice_3) : undefined,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				console.log(
					`Voici les data de la création`,
					JSON.stringify(data, null, 2)
				);
			}
			if (!res.ok) {
				console.log("bdd non mise à jour");
			}

			setMessageSuccess(`Ajout de ${localName} réalisé avec succès`);
			setTimeout(() => setOpenCreate(false), 3000);
			resetFormLocalStates();
			setDataVersion((prev) => prev + 1);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	const listCat1 = [...new Set(menuItems.map((item) => item.cat1))].filter(
		Boolean
	);

	const listCat2 = [
		...new Set(
			menuItems
				.filter((item) => item.cat1 === localCat1)
				.map((item) => item.cat2)
		),
	].filter(Boolean);

	const listCat3 = [
		...new Set(
			menuItems
				.filter((item) => item.cat2 === localCat2)
				.map((item) => item.cat3)
		),
	].filter(Boolean);
	// ========================= Delete modal =================

	async function handleDelete() {
		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/menu/${id}`, {
				method: "DELETE",
			});

			const data = await res.json();

			if (data.ok) {
				console.log("Base de donnée mise à jour");
			}

			setMessageSuccess(`Suppresion de ${name} réalisée avec succès`);
			setTimeout(() => setOpenDelete(false), 3000);
			setDataVersion((prev) => prev + 1);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="text-white flex flex-col w-full min-h-screen max-sm:overflow-visible">
			<div className="flex flex-row justify-around p-6">
				<h3 className="text-5xl text-white font-subtitle underline font-light text-center">
MENU
				</h3>
			</div>
			<div className="border-b border-t border-secondary m-3">
				<div className="flex flex-row border-b border-white">
					<h4 className="text-2xl text-secondary text-center m-3 flex-1 self-center">
						Les boissons
					</h4>
					<AdminDrinksList
						setCategory={setCategory}
						setCategoryName={setCategoryName}
						setActiveSafeid={setActiveSafeid}
						drinks={drinks}
						activeSafeid={activeSafeid}
					/>
				</div>
				<div className="flex flex-row ">
					<h4 className="text-2xl text-secondary text-center m-3 flex-1 self-center">
						Les plats
					</h4>
					<AdminFoodList
						setCategory={setCategory}
						setCategoryName={setCategoryName}
						setActiveSafeid={setActiveSafeid}
						food={food}
						activeSafeid={activeSafeid}
					/>
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
												setOpenEdit(true);
												setId(item.id);

												setLocalName(item.name);
												setLocalDescription(item.description || "");
												setLocalPrice_1(item.prix_1 || "");
												setLocalPrice_2(item.prix_2 || "");
												setLocalPrice_3(item.prix_3 || "");
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
			<div className="flex self-center pb-8">
				<Button onClick={() => setOpenCreate(true)}>
					Ajouter un élement au menu
				</Button>
			</div>
			{/* ========================== Update Modal ==========================*/}
			<GenericModal
				isOpen={openEdit}
				onClose={resetAllModalStatesAndClose}
				title={"Modification de"}
				name={name}
				isSubmitting={isSubmitting}
				errors={errors}
				messageSuccess={messageSuccess}
				confirmText={"Modifier"}
				onConfirm={handleEdit}
				message={undefined}
			>
				<div className="font-body mb-4 px-12 max-sm:px-4">
					<form className="grid grid-cols-1 gap-3 [&>input]:text-white [&>textarea]:text-white [&>select]:text-white [&_*::placeholder]:text-white [color-scheme:dark]">
						<div>
							<label htmlFor="name" className="block mb-1">
								Nom
							</label>
							<input
								type="text"
								name="name"
								value={localName}
								onChange={(e) => setLocalName(e.target.value)}
								required
								className="border border-secondary p-1 pl-2 w-full"
							/>
						</div>

						<div>
							<label htmlFor="description" className="block mb-1">
								Description
							</label>
							<input
								type="text"
								name="description"
								value={localDescription}
								onChange={(e) => setLocalDescription(e.target.value)}
								className="border border-secondary p-1 pl-2 w-full"
							/>
						</div>

						<div className="grid grid-cols-3 gap-10">
							<div>
								<label htmlFor="price_1" className="block text-center">
									Prix 1
								</label>
								<input
									type="number"
									name="price_1"
									value={localPrice_1 ?? ""}
									onChange={(e) => setLocalPrice_1(e.target.value)}
									required
									className="border border-secondary text-center w-full"
								/>
							</div>
							<div>
								<label htmlFor="price_2" className="block text-center">
									Prix 2
								</label>
								<input
									type="number"
									name="price_2"
									value={localPrice_2 ?? ""}
									onChange={(e) => setLocalPrice_2(e.target.value)}
									required
									className="border border-secondary text-center w-full"
								/>
							</div>
							<div>
								<label htmlFor="price_3" className="block text-center">
									Prix 3
								</label>
								<input
									type="number"
									name="price_3"
									value={localPrice_3 ?? ""}
									onChange={(e) => setLocalPrice_3(e.target.value)}
									required
									className="border border-secondary text-center w-full"
								/>
							</div>
						</div>
					</form>
				</div>
			</GenericModal>
			{/* ========================== Delete modal ========================== */}
			<GenericModal
				isOpen={openDelete}
				onClose={resetAllModalStatesAndClose}
				title={"Suppression de"}
				name={name}
				isSubmitting={isSubmitting}
				errors={errors}
				messageSuccess={messageSuccess}
				confirmText={"Supprimer"}
				onConfirm={handleDelete}
				message={`Etes-vous certain de vouloir supprimer ${name} ?`}
			></GenericModal>

			{/* ========================== Create modal ========================== */}
			<GenericModal
				isOpen={openCreate}
				onClose={resetAllModalStatesAndClose}
				title={"Ajout d'un élement au menu"}
				name={name}
				isSubmitting={isSubmitting}
				errors={errors}
				messageSuccess={messageSuccess}
				confirmText={"Créer"}
				onConfirm={handleCreate}
				message={undefined}
			>
				<form className=" [color-scheme:dark] grid grid-co-2 grid-row-16 gap-y-2 px-12">
					<label htmlFor="cat1" className="">
						Catégorie 1
					</label>
					<select
						name="cat1"
						value={localCat1}
						onChange={(e) => setLocalCat1(e.target.value)}
						required
						className="border border-secondary p-1 pl-2 col-span-2"
					>
						<option value="" hidden>
							(obligatoire)
						</option>
						{listCat1.map((cat1) => {
							if (!cat1) return null;
							return (
								<option key={cat1} value={cat1}>
									{cat1}
								</option>
							);
						})}
					</select>
					<label htmlFor="cat2" className="">
						Catégorie 2
					</label>
					<select
						name="cat2"
						value={localCat2}
						onChange={(e) => setLocalCat2(e.target.value)}
						required
						id="number"
						className="border border-secondary p-1 pl-2 col-span-2"
					>
						<option value="" hidden>
							(obligatoire)
						</option>
						{listCat2.map((cat2) => {
							if (!cat2) return null;
							return (
								<option key={cat2} value={cat2}>
									{cat2}
								</option>
							);
						})}
					</select>
					<label htmlFor="cat3" className="">
						Catégorie 3
					</label>
					<select
						name="cat3"
						value={localCat3 ? localCat3 : ""}
						onChange={(e) => setLocalCat3(e.target.value)}
						className="border border-secondary p-1 pl-2 col-span-2"
					>
						<option value="" hidden>
							(optionnelle)
						</option>
						{listCat3.map((cat3) => {
							if (!cat3) return null;
							return (
								<option key={cat3} value={cat3}>
									{cat3}
								</option>
							);
						})}
					</select>
					<label htmlFor="name" className="">
						Nom
					</label>
					<input
						type="text"
						name="name"
						value={localName}
						onChange={(e) => setLocalName(e.target.value)}
						required
						placeholder="(obligatoire)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Déscription
					</label>
					<input
						type="text"
						name="description"
						value={localDescription}
						onChange={(e) => setLocalDescription(e.target.value)}
						placeholder="(optionnelle)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Prix 1
					</label>
					<input
						type="numeric"
						name="price1"
						value={localPrice_1}
						onChange={(e) => setLocalPrice_1(e.target.value)}
						required
						placeholder="(obligatoire)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Prix 2
					</label>
					<input
						name="price2"
						value={localPrice_2 ? localPrice_2 : ""}
						onChange={(e) => setLocalPrice_2(e.target.value)}
						placeholder="(optionnel)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Prix 3
					</label>
					<input
						name="price3"
						value={localPrice_3 ? localPrice_3 : ""}
						onChange={(e) => setLocalPrice_3(e.target.value)}
						placeholder="(optionnel)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
				</form>
			</GenericModal>
		</div>
	);
}
