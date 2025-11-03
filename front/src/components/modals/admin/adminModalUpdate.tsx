import { Loader } from "lucide-react";
import { Button } from "../../ui/button";
import { XIcon } from "../../ui/XIcon";
import { useState, useEffect } from "react";

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	id: number | undefined;
	description: string | undefined;
	price_1: string | undefined;
	price_2: string | undefined;
	price_3: string | undefined;
}

export default function AdminModalDelete({
	isOpen,
	onClose,
	name,
	id,
	description,
	price_1,
	price_2,
	price_3,
}: Modalprops) {
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");

	const [localName, setLocalName] = useState<string>("");
	const [localDescription, setLocalDescription] = useState<string>("");
	const [localPrice_1, setLocalPrice_1] = useState<string>("");
	const [localPrice_2, setLocalPrice_2] = useState<string>("");
	const [localPrice_3, setLocalPrice_3] = useState<string>("");

	useEffect(() => {
		if (isOpen) {
			setLocalName(name);
			setLocalDescription(description || "");
			setLocalPrice_1(price_1 || "");
			setLocalPrice_2(price_2 || "");
			setLocalPrice_3(price_3 || "");
		}
	}, [isOpen, name, description, price_1, price_2, price_3]);

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

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

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

			if (data.ok) {
				console.log("Base de donnée mise à jour");
			}
			setMessageSuccess("Mise à jour réalisée avec succès");
			setTimeout(() => onClose(), 1000);

		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			setIsSubmitting(false);
		}
	}

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
				<h3 className="text-2xl mb-8 text-white font-subtitle font-light justify-self-center text-center">
					Modification de : <br />{" "}
					<span className="text-secondary">{name}</span>
				</h3>

				<div
					className="font-body mb-4 px-12
				max-sm:px-4"
				>
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
					{errors && errors !== "" && (
						<p className="font-body font-light italic text-red-500 py-2">
							{" "}
							{errors}
						</p>
					)}
					{messageSuccess && messageSuccess !== "" && (
						<p className="text-secondary py-2">{messageSuccess}</p>
					)}
				</div>
				<div className="flex flex-row justify-center ">
					<Button
						type="submit"
						className="m-6 flex justify-self-center"
						disabled={isSubmitting}
						onClick={() => onClose()}
					>
						Annuler
					</Button>
					<Button
						type="submit"
						className="m-6 flex justify-self-center"
						disabled={isSubmitting}
						onClick={(e) => handleSubmit(e)}
					>
						{isSubmitting ? (
							<>
								<Loader className="animate-spin mr-2" />
								Modification en cours...
							</>
						) : (
							"Modifier le plat"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
