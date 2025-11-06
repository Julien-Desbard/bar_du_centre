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

			if(!res.ok) {
				console.log("La mise à jour n'a pas réussi")
				return 
			}
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

	return (
		<div className="text-white flex flex-col w-full min-h-screen max-sm:overflow-visible">
			<div className="flex flex-row justify-around p-6">
				<h3 className="text-5xl text-white font-subtitle font-light text-center">
					Administration de la{" "}
					<span className="text-secondary">CARTE DU JOUR</span>
				</h3>
			</div>
			{/* <AdminCarteList
				carteItems={carteItems}
				setOpenEdit={setOpenEdit}
				setOpenDelete={setOpenDelete}
				setId={setId}
				setName={setName}
				setCategorie={setCategorie}
				setPrix={setPrix}
			/> */}
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
			<div className="flex self-center">
				<Button onClick={() => setOpenCreate(true)}>
					Créer un élement de menu
				</Button>
			</div>
			{/* ========================== Update Modal ==========================*/}
			<GenericModal
				isOpen={openEdit}
				onClose={resetAllModalStatesAndClose}
				title={"Modification de"}
				name={localName}
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
							<label htmlFor="description" className="block mb-1">
								Categorie
							</label>
							<input
								type="text"
								name="categorie"
								value={localCategorie}
								onChange={(e) => setLocalCategorie(e.target.value)}
								className="border border-secondary p-1 pl-2 w-full"
							/>
						</div>
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
		</div>
	);
}
