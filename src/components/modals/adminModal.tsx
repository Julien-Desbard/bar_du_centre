import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import { useState, useRef, useEffect } from "react";

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	description: string;
	price_1: number | undefined;
	price_2: number | undefined;
}

export default function AdminModal({
	isOpen,
	onClose,
	name,
	description,
	price_1,
	price_2,
}: Modalprops) {
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");

	const [localName, setLocalName] = useState<string>("");
	const [localDescription, setLocalDescription] = useState<string>("");
	const [localPrice_1, setLocalPrice_1] = useState<number | undefined>(
		undefined
	);
	const [localPrice_2, setLocalPrice_2] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		if (isOpen) {
			setLocalName(name);
			setLocalDescription(description);
			setLocalPrice_1(price_1);
			setLocalPrice_2(price_2);
		}
	}, [isOpen, name, description, price_1, price_2]);

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

	// Focusing on the first input field of the form
	const nameRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isOpen && nameRef.current) {
			nameRef.current.focus();
		}
	}, [isOpen]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setIsSubmitting(true);
		try {
			const res = fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({}),
			});
			const data = await (await res).json();
			if (data.ok) {
				console.log("Base de donnée mise à jour");
			}

			setMessageSuccess("Mise à jour réalisée avec succès");
			setTimeout(() => onClose(), 3000);
			setIsSubmitting(false);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
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
				<h3 className="text-2xl mb-8 text-white font-subtitle font-light justify-self-center">
					Modification du plat : xxx
				</h3>

				<div
					className="font-body mb-4 px-12
				max-sm:px-4"
				>
					<form className="grid grid-cols-2 grid-row-8 gap-2 [&>input]:text-white [&>textarea]:text-white [&>select]:text-white [&_*::placeholder]:text-white [color-scheme:dark]">
						<label htmlFor="name" className="">
							Nom
						</label>
						<input
							type="text"
							ref={nameRef}
							name="name"
							value={localName}
							onChange={(e) => setLocalName(e.target.value)}
							required
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="email" className="">
							Description
						</label>
						<input
							type="text"
							name="description"
							value={localDescription}
							onChange={(e) => setLocalDescription(e.target.value)}
							inputMode="email"
							required
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="name" className="">
							Prix n°1
						</label>
						<input
							type="number"
							name="price_1"
							value={localPrice_1 ?? ""}
							onChange={(e) =>
								setLocalPrice_1(
									e.target.value === "" ? undefined : Number(e.target.value)
								)
							}
							required
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="name" className="">
							Prix n°2
						</label>
						<input
							type="number"
							name="price_2"
							value={localPrice_2 ?? ""}
							onChange={(e) =>
								setLocalPrice_2(
									e.target.value === "" ? undefined : Number(e.target.value)
								)
							}
							required
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
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
