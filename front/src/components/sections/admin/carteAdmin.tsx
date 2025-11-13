"use client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import AdminCarteList from "@/components/lists/adminCarteList";
import GenericModal from "@/components/modals/genericModal";

export type CarteItems = {
	id: number;
	categorie: string;
	name: string;
	prix: string;
};

export default function CarteAdmin() {
	// generic Modal states
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");
	const [dataVersion, setDataVersion] = useState(0);

	// update modal states
	const [openEdit, setOpenEdit] = useState(false);
	const [carteItems, setcarteItems] = useState<CarteItems[]>([]);
	const [id, setId] = useState<number | undefined>(undefined);
	const [name, setName] = useState("");
	const [localName, setLocalName] = useState("");
	const [localCategorie, setLocalCategorie] = useState("");
	const [localPrix, setLocalPrix] = useState("");

	// Delete modal states
	const [openDelete, setOpenDelete] = useState(false);

	// Create modal states
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
	}, [dataVersion]);

	const resetAllModalStatesAndClose = () => {
		// 1. Fermeture des modales
		setOpenEdit(false);
		setOpenCreate(false);
		setOpenDelete(false);

		// 2. Réinitialisation des states temporaires liés à l'élément sélectionné
		setName("");
		setId(undefined);

		// 3. Réinitialisation des states locaux du formulaire (local...)
		setLocalName("");
		setLocalCategorie("");
		setLocalPrix("");

		// 4. Réinitialisation des messages de feedback/erreur
		setErrors("");
		setMessageSuccess("");
	};

	// ================================== Update modal ==================================

	async function handleEdit() {
		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/carte/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: localName,
					categorie: localCategorie,
					prix: Number(localPrix),
				}),
			});

			if (!res.ok) {
				console.log(`La mise à jour de ${name}n'a pas réussi`);
				return;
			}
			const data = await res.json();

			if (res.ok) {
				console.log(
					`Voici les data de la mise à jour de ${name}: `,
					JSON.stringify(data, null, 2)
				);
			}
			setMessageSuccess(`Mise à jour de ${name}réalisée avec succès`);
			setTimeout(() => resetAllModalStatesAndClose(), 3000);
			setDataVersion((prev) => prev + 1);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	// ================================== Delete modal ==================================

	async function handleDelete() {
		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/carte/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			if (!res.ok) {
				console.log(`La suppression de ${name} n'a pas réussi`);
				return;
			}

			if (res.ok) {
				console.log(`Suppression de ${name} réussie`);
			}
			setMessageSuccess(`Suppression de ${name} réussie`);
			setTimeout(() => resetAllModalStatesAndClose(), 3000);
			setDataVersion((prev) => prev + 1);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	// ================================== Create modal ==================================

	async function handleCreate() {
		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/carte`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: localName,
					categorie: localCategorie,
					prix: Number(localPrix),
				}),
			});

			if (!res.ok) {
				console.log(`La création de ${localName} n'a pas réussi`);
				return;
			}

			const data = await res.json();

			if (res.ok) {
				console.log(
					`Voici les data de la création de ${name}: `,
					JSON.stringify(data, null, 2)
				);
			}

			setMessageSuccess(`Création de ${localName} réussie`);
			setTimeout(() => resetAllModalStatesAndClose(), 3000);
			setDataVersion((prev) => prev + 1);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	const listCat1 = [
		...new Set(carteItems.map((item) => item.categorie)),
	].filter(Boolean);

	return (
		<div className="text-white pt-24 flex flex-col w-full max-sm:overflow-visible">
			<div className="flex flex-row justify-around p-6">
				<h3 className="text-5xl text-white underline font-subtitle font-light text-center">
CARTE DU JOUR
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
								if (!item) return null;
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
												setName(item.name)
												setLocalName(item.name);
												setLocalCategorie(item.categorie);
												setLocalPrix(item.prix);
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
			<div className="flex self-center pb-12">
				<Button onClick={() => setOpenCreate(true)}>
					Ajouter un élément à la carte
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
							<label htmlFor="price_1" className="block text-start">
								Prix
							</label>
							<input
								type="number"
								name="prix"
								value={localPrix}
								onChange={(e) => setLocalPrix(e.target.value)}
								required
								className="border border-secondary p-1 pl-2 w-full"
							/>
						</div>
					</form>
				</div>
			</GenericModal>
			{/* ========================== Delete Modal ==========================*/}
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
			/>
			{/* ========================== Create Modal ==========================*/}
			<GenericModal
				isOpen={openCreate}
				onClose={resetAllModalStatesAndClose}
				title={"Ajout d'un élement à la carte du jour"}
				name={undefined}
				isSubmitting={isSubmitting}
				errors={errors}
				messageSuccess={messageSuccess}
				confirmText={"Ajouter"}
				onConfirm={handleCreate}
				message={undefined}
			>
				<form className=" [color-scheme:dark] grid grid-co-2 grid-row-16 gap-y-2 px-12">
					<label htmlFor="categorie" className="">
						Catégorie
					</label>
					<select
						name="categorie"
						value={localCategorie}
						onChange={(e) => setLocalCategorie(e.target.value)}
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
					<label htmlFor="nom" className="">
						Nom
					</label>
					<input
						name="nom"
						value={localName}
						onChange={(e) => setLocalName(e.target.value)}
						required
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
										<label htmlFor="prix" className="">
						Prix
					</label>
					<input
						name="prix"
						type="number"
						value={localPrix}
						onChange={(e) => setLocalPrix(e.target.value)}
						required
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
				</form>
			</GenericModal>
		</div>
	);
}
