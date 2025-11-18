import { Suspense } from "react";
import { MenuItem, CarteItems } from "@/@types";
import dynamicImport from "next/dynamic";
import Image from "next/image";

// Importations statiques
import Hero from "../components/sections/Hero";
import Menu from "../components/sections/Menu";
import AnimatedSection from "../components/Animations/AnimatedSections";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Privatize from "@/components/sections/Privatize";

// Importations dynamiques
const Events = dynamicImport(() => import("../components/sections/Events"), {
	loading: () => (
		<div className="min-h-screen flex items-center justify-center p-8 bg-gray-50/50">
			Chargement des événements...
		</div>
	),
	ssr: true,
});

export const revalidate = 86400;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch toutes les données en parallèle
async function getAllMenuData() {
	try {
		const [carteResponse, platsResponse, boissonsResponse] = await Promise.all([
			fetch(`${BASE_URL}carte`, {
				next: { revalidate: 86400 },
			}),
			fetch(`${BASE_URL}menu/cat/plats`, {
				next: { revalidate: 86400 },
			}),
			fetch(`${BASE_URL}menu/cat/boissons`, {
				next: { revalidate: 86400 },
			}),
		]);

		const [carteData, platsData, boissonsData] = await Promise.all([
			carteResponse.ok ? carteResponse.json() : null,
			platsResponse.ok ? platsResponse.json() : null,
			boissonsResponse.ok ? boissonsResponse.json() : null,
		]);

		return {
			carteData: (carteData?.allCarteItems||[]) as CarteItems[],
			platsMenu: (platsData?.menuItemsPerCat1 || []) as MenuItem[],
			boissonsMenu: (boissonsData?.menuItemsPerCat1 || []) as MenuItem[],
		};
	} catch (error) {
		console.error("Erreur lors du fetch des données:", error);
		return {
			carteData: [],
			platsMenu: [],
			boissonsMenu: [],
		};
	}
}

export default async function Home() {
	const { carteData, platsMenu, boissonsMenu } = await getAllMenuData();

	return (
		<>
			<section className="w-full relative">
				<Image
					src="/images/hero/hero.webp"
					alt="Le Bar du Centre, Arrière-plan"
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 z-0 bg-black/50" />
				<div className="max-w-[1280px] mx-auto h-full relative z-10">
					<Hero />
				</div>
			</section>

			<AnimatedSection
				animation="fade-up"
				threshold={0.1}
				delay={300}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Menu
						carteData={carteData}
						platsMenu={platsMenu}
						boissonsMenu={boissonsMenu}
					/>
				</div>
			</AnimatedSection>

			<AnimatedSection
				animation="fade-up"
				delay={300}
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Privatize />
				</div>
			</AnimatedSection>

			<AnimatedSection
				animation="fade-up"
				delay={300}
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Suspense fallback={<div>Chargement des événements...</div>}>
						<Events />
					</Suspense>
				</div>
			</AnimatedSection>
			<AnimatedSection
				animation="fade-up"
				delay={300}
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Contact />
				</div>
			</AnimatedSection>
			<div className="max-w-[1280px] mx-auto">
				<Footer />
			</div>
		</>
	);
}
