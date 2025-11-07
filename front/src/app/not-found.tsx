import Link from "next/link";
import { ChevronLeft } from "lucide-react"; // Assurez-vous que 'lucide-react' est installé
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		// CONTEXTE GLOBAL : Utilisation des classes dark: existantes
		<div className="flex flex-col items-center justify-center min-h-screen bg-bgbody p-8">
			<div className="text-center max-w-lg">
				{/* TITRE PRINCIPAL : On utilise la couleur Indigo pour l'accent */}
				<p className="text-sm text-white font-semibold  uppercase tracking-widest pb-3">
					Erreur 404
				</p>
				<h1 className="mt-2 text-5xl font-extrabold  text-secondary font-title pb-3">
					Ressource Manquante
				</h1>

				{/* MESSAGE : On augmente légèrement la taille du message principal */}
				<p className="mt-6 text-white font-body text-xl pb-6">
					Nous sommes désolés, la page ou la ressource que vous recherchez est
					introuvable. Elle a peut-être été déplacée ou supprimée.
				</p>

				{/* ACTION / BOUTON : Utilisation de l'indigo comme couleur d'action primaire */}
				<div className="mt-10 flex justify-center">
					<Button>
                    <Link
						href="/"
					>
						Retourner en lieu sûr (Accueil)
					</Link>
                    </Button>
				</div>
			</div>
		</div>
	);
}