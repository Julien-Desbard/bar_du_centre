import { Suspense } from "react";
import { ApiResponse } from "@/@types";
import dynamicImport from "next/dynamic"; // Renommer l'import pour éviter le conflit

// Importations statiques pour les composants légers ou critiques (comme Hero)
import Hero from "../components/sections/Hero";
import Menu from "../components/sections/Menu";
import Image from "next/image";

// Importations dynamiques pour le lazy loading et le Suspense
const Privatize = dynamicImport(
	() => import("../components/sections/Privatize"),
	{
		loading: () => (
			<div className="min-h-screen flex items-center justify-center p-8 bg-gray-50/50">
				Chargement de la section Privatisation...
			</div>
		),
		ssr: true,
	}
);
const Events = dynamicImport(() => import("../components/sections/Events"), {
	loading: () => (
		<div className="min-h-screen flex items-center justify-center p-8 bg-gray-50/50">
			Chargement des événements...
		</div>
	),
	ssr: true,
});

// Configuration de la page - plus de conflit de nom maintenant
export const dynamic = "force-dynamic";
export const revalidate = 0;

const getMenuData = async (): Promise<ApiResponse | null> => {
	const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
	try {
		const res = await fetch(`${BASE_URL}carte`, { cache: "no-store" });

		if (!res.ok) {
			console.error("API error", res.status, res.statusText);
			return null;
		}

		const data: ApiResponse = await res.json(); // <-- await + ()
		console.log("API returned", data); // <-- log serveur
		return data;
	} catch (e) {
		console.error("Fetch crash", e);
		return null;
	}
};

export default async function Home() {
	const menuData = await getMenuData();

	return (
		<>
			{/* Section Héro */}
			<section className="min-h-screen snap-start w-full relative overflow-hidden">
				<Image
					src="/images/beer.webp"
					alt="Le Bar du Centre, Arrière-plan"
					fill
					priority
					quality={80}
					sizes="100vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 z-0 bg-black/20" />
				<div className="max-w-[1280px] mx-auto h-full relative z-10">
					<Hero />
				</div>
			</section>

			{/* Section Menu */}
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Menu menuData={menuData} />
				</div>
			</section>

			{/* Section Privatize */}
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Suspense
						fallback={<div>Chargement de la section Privatisation...</div>}
					>
						<Privatize />
					</Suspense>
				</div>
			</section>

			{/* Section Events */}
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Suspense fallback={<div>Chargement des événements...</div>}>
						<Events />
					</Suspense>
				</div>
			</section>
		</>
	);
}
