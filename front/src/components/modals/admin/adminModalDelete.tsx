import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui//XIcon";
import { useState, useEffect } from "react";

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	id: number | undefined;
}

export default function AdminModal({ isOpen, onClose, name, id }: Modalprops) {
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");
	const [localName, setLocalName] = useState<string>("");

	useEffect(() => {
		if (isOpen) {
			setLocalName(name);
		}
	}, [isOpen, name]);

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
				method: "DELETE",
			});

			const data = await res.json();

			if (data.ok) {
				console.log("Base de donnée mise à jour");
			}

			setMessageSuccess(`Suppresion de ${name} réalisée avec succès`);
			setTimeout(() => onClose(), 2000);
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
				<h3 className="text-2xl mb-8 text-white font-subtitle font-light justify-self-center">
					Suppression d'un élement du menu
				</h3>

				<div
					className="font-body mb-4 px-12 text-xl text-center
				max-sm:px-4"
				>
					<p>
						Etes-vous certain de vouloir supprimer :
					</p>
                    <p className="text-secondary pt-2">{name.toUpperCase()}</p>
				</div>
				{messageSuccess && messageSuccess !== "" && (
					<p className="text-secondary py-2 text-center">{messageSuccess}</p>
				)}
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
							`Supprimer ${name} ?`
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
