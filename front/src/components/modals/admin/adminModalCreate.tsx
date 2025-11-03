import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/XIcon";
import { useState, useEffect } from "react";
import { MenuItem } from "@/components/sections/Admin";

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
	menuItems: MenuItem[];
}

export default function AdminModalCreate({
	isOpen,
	onClose,
	menuItems,
}: Modalprops) {
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");
	const [localName, setLocalName] = useState<string>("");
	const [localCat1, setLocalCat1] = useState<string>("");
	const [localCat2, setLocalCat2] = useState<string>("");
	const [localCat3, setLocalCat3] = useState<string>("");
	const [localDescription, setLocalDescription] = useState<string>("");
	const [localPrice_1, setLocalPrice_1] = useState<string>("");
	const [localPrice_2, setLocalPrice_2] = useState<string>("");
	const [localPrice_3, setLocalPrice_3] = useState<string>("");

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

	const resetFormStates = () => {
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
				msg: "Pour ajouter un élement au mneu, vous devez renseigner tous les champs obligatoires,
			};

		return {
			ok: true,
			msg: "",
		};
	};

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const fieldCheck = checkAllFieldsAreFilled();
		if (!fieldCheck.ok) {
			setErrors(fieldCheck.msg);
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await fetch(`http://localhost:3001/api/menu`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: localName,
					description: localDescription,
					cat1: localCat1,
					cat2: localCat2 ? localCat2 : null,
					cat3: localCat3 ? localCat3 : null,
					prix_1: localPrice_1 ? Number(localPrice_1) : null,
					prix_2: localPrice_2 ? Number(localPrice_2) : null,
					prix_3: localPrice_3 ? Number(localPrice_3) : null,
				}),
			});

			const data = await res.json();

			if (data.ok) {
				console.log("Base de donnée mise à jour");
			}
			setMessageSuccess(`Ajout de ${localName} réalisé avec succès`);
			setTimeout(() => onClose(), 2000);
			resetFormStates();
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

	const listCat1 = [...new Set(menuItems.map((item) => item.cat1))].filter(
		Boolean
	);

	const listCat2 = [...new Set(menuItems.map((item) => item.cat2))].filter(
		Boolean
	);

	const listCat3 = [...new Set(menuItems.map((item) => item.cat3))].filter(
		Boolean
	);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={() => onClose()}
		>
			<div
				className="bg-[url('/images/background.jpg')] bg-cover bg-center p-2 w-full max-w-xl shadow-lg text-white font-body"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="justify-self-end">
					<button
						type="button"
						aria-label="Fermer le menu"
						className=" hover:text-secondary transition-colors duration-300 ease-in-out"
					>
						<XIcon onClick={() => onClose()} className="w-6 h-6" />
					</button>
				</div>
				<h3 className="text-2xl mb-8 text-white font-subtitle font-light justify-self-center">
					Ajout d'un élement au menu
				</h3>
				<form
					className=" [&>input]:text-white [&>textarea]:text-white [&>select]:text-white [&_*::placeholder]:text-white [color-scheme:dark] grid grid-co-2 grid-row-16 gap-y-2 px-12"
				>
					<label htmlFor="cat1" className="">
						1ère catégorie
					</label>
					<select
						name="cat1"
						value={localCat1}
						onChange={(e) => setLocalCat1(e.target.value)}
						required
						className="border border-secondary p-1 pl-2 col-span-2"
					>
						<option value="" hidden>
							Selectionner une catégorie (obligatoire)
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
						2nd catégorie
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
							Selectionner une catégorie (obligatoire)
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
						3eme catégorie
					</label>
					<select
						name="cat3"
						value={localCat3 ? localCat3 : "" }
						onChange={(e) => setLocalCat3(e.target.value)}
						className="border border-secondary p-1 pl-2 col-span-2"
					>
						<option value="" hidden>
							Selectionner une catégorie (optionnelle)
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
						Nom (obligatoire)
					</label>
					<input
						type="text"
						name="name"
						value={localName}
						onChange={(e) => setLocalName(e.target.value)}
						required
						placeholder="Nom de l'élément à ajouter"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Déscription (optionnelle)
					</label>
					<input
						type="text"
						name="description"
						value={localDescription}
						onChange={(e) => setLocalDescription(e.target.value)}
						placeholder="Description de l'élément à ajouter"
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
						placeholder="Prix de l'élement (obligatoire)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Prix 2
					</label>
					<input
						name="price2"
						value={localPrice_2 ? localPrice_2 : "" }
						onChange={(e) => setLocalPrice_2(e.target.value)}
						placeholder="Prix de l'élement (optionnel)"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
					<label htmlFor="name" className="">
						Prix 3
					</label>
					<input
						name="price3"
						value={localPrice_3 ? localPrice_3 : "" }
						onChange={(e) => setLocalPrice_3(e.target.value)}
						placeholder="Prix de l'élement (optionnel"
						className="border border-secondary p-1 pl-2 col-span-2"
					/>
				</form>
				{messageSuccess && messageSuccess !== "" && (
					<p className="text-secondary py-2 text-center">{messageSuccess}</p>
				)}
				<div className="flex flex-row justify-center ">
					<Button
						className="m-6 flex justify-self-center"
						// disabled={isSubmitting}
						onClick={() => onClose()}
					>
						Annuler
					</Button>
					<Button
						type="submit"
						className="m-6 flex justify-self-center"
						// disabled={isSubmitting}
						onClick={(e) => handleSubmit(e)}
					>
						{isSubmitting ? (
							<>
								<Loader className="animate-spin mr-2" />
								Modification en cours...
							</>
						) : (
							`Ajouter ${localName} ?`
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
