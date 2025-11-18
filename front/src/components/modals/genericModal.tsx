"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/XIcon";
import { Loader } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import Portal from "../Portal/portal";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;

	// contrôles d’action
	confirmText?: string;
	onConfirm?: () => void;
	disableConfirm?: boolean;
	loading?: boolean;
	isSubmitting: boolean;

	// messages
	errors: string;
	messageSuccess: string;

	// emplacement formulaire
	children?: ReactNode;
	name: string | undefined;
	title: string;
	message: string | undefined;
}

export default function GenericModal({
	isOpen,
	onClose,
	confirmText = "Confirmer",
	isSubmitting,
	onConfirm,
	children,
	name,
	title,
	errors,
	messageSuccess,
	message = undefined,
}: ModalProps) {
	// setTimeout(() => onClose(), 5000);
	if (!isOpen) return null;

	// Bloquer le scroll quand la modale est ouverte
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<Portal>
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"

				onClick={onClose} // ferme au clic overlay
			>
				<div
					className="bg-gradient-dark p-2 w-full max-w-xl shadow-lg text-white font-body"
					onClick={(e) => e.stopPropagation()} // bloque la propagation
				>
					{/* Close */}
					<div className="flex justify-end">
						<button
							type="button"
							aria-label="Fermer"
							className="hover:text-secondary transition-colors duration-300 ease-in-out"
							onClick={onClose}
						>
							<XIcon className="w-6 h-6" />
						</button>
					</div>

					{/* Titre basé sur `name` */}
					<h3 className="text-2xl mb-8 text-white font-subtitle font-light text-center">
						{title} <br />
						<span className="text-secondary">{name}</span>
					</h3>

					{/* Emplacement des children */}
					<div>{children}</div>
					{message && (
						<div
							className="font-body mb-4 px-12 text-xl text-center
				max-sm:px-4"
						>
							<p>{message}</p>
						</div>
					)}

					{/* Message erreurs ou réussite */}
					{errors && errors !== "" && (
						<p className="font-body font-light italic text-red-500 py-2">
							{" "}
							{errors}
						</p>
					)}
					{messageSuccess && messageSuccess !== "" && (
						<p className="text-secondary py-2 text-center">{messageSuccess}</p>
					)}

					{/* Footer */}
					<div className="flex flex-row justify-center pb-2">
						<Button
							type="submit"
							aria-label="Annuler"
							className="m-6 flex justify-self-center"
							disabled={isSubmitting}
							onClick={onClose}
						>
							Annuler
						</Button>

						{onConfirm && (
							<Button
								type="submit"
								className="m-6 flex justify-self-center"
								aria-label={confirmText}
								disabled={isSubmitting}
								onClick={onConfirm}
							>
								{isSubmitting ? (
									<>
										<Loader className="animate-spin mr-2" />
										Modification en cours...
									</>
								) : (
									`${confirmText} ?`
								)}
							</Button>
						)}
					</div>
				</div>
			</div>
		</Portal>
	);
}
