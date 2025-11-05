"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/XIcon";
import type { ReactNode } from "react";

interface ModalPropsCompat {
	isOpen: boolean;
	onClose: () => void;

	// mêmes noms que ta modale existante
	name: string;
	id?: number;
	description?: string;
	price_1?: string;
	price_2?: string;
	price_3?: string;

	// contrôles d’action
	confirmText?: string; // ex: "Modifier le plat"
	onConfirm?: () => void;
	disableConfirm?: boolean;
	loading?: boolean;

	// contenu optionnel si tu veux injecter un formulaire custom
	children?: ReactNode;
}

export default function ModalBdcCompat({
	isOpen,
	onClose,
	name,
	id,
	description,
	price_1,
	price_2,
	price_3,
	confirmText = "Confirmer",
	onConfirm,
	disableConfirm = false,
	loading = false,
	children,
}: ModalPropsCompat) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={onClose} // ferme au clic overlay
		>
			<div
				className="bg-[url('/images/background.jpg')] bg-cover bg-center p-2 w-full max-w-xl shadow-lg text-white font-body"
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
					Modification de : <br />
					<span className="text-secondary">{name}</span>
				</h3>

				{/* Contenu par défaut si tu ne fournis pas `children` */}
				<div className="font-body mb-4 px-12 max-sm:px-4">
					{children ?? (
						<div className="space-y-2 text-sm opacity-80">
							<div>ID: {id ?? "—"}</div>
							<div>Description: {description ?? "—"}</div>
							<div>Prix 1: {price_1 ?? "—"}</div>
							<div>Prix 2: {price_2 ?? "—"}</div>
							<div>Prix 3: {price_3 ?? "—"}</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex flex-row justify-center pb-2">
					<Button
						type="button"
						className="m-6 flex justify-self-center"
						onClick={onClose}
						disabled={loading}
					>
						Annuler
					</Button>

					{onConfirm && (
						<Button
							type="button"
							className={`m-6 flex justify-self-center ${
								confirmText.toLowerCase().includes("supprim") ||
								confirmText.toLowerCase().includes("annul")
									? "bg-red-600 hover:bg-red-700"
									: "bg-primary text-black hover:bg-primary-dark"
							}`}
							onClick={onConfirm}
							disabled={disableConfirm || loading}
						>
							{loading ? "Envoi…" : confirmText}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
