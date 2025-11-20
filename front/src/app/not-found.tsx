import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-bgbody p-8">
			<div className="text-center max-w-lg">
				<p className="text-sm text-white font-semibold  uppercase tracking-widest pb-3">
					Erreur 404
				</p>
				<h1 className="mt-2 text-5xl font-extrabold  text-secondary font-title pb-3">
					Ressource Manquante
				</h1>

				<p className="mt-6 text-white font-body text-xl pb-6">
					Nous sommes désolés, la page ou la ressource que vous recherchez est
					introuvable. Elle a peut-être été déplacée ou supprimée.
				</p>

				<div className="mt-10 flex justify-center">
					<Button>
                    <Link
						href="/"
						aria-label="revenir à l'accueil"
					>
						Retourner en lieu sûr (Accueil)
					</Link>
                    </Button>
				</div>
			</div>
		</div>
	);
}