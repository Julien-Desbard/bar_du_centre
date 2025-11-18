import { Suspense } from "react";
import { ApiResponse } from "@/@types";
import dynamicImport from "next/dynamic";
import Image from "next/image";

// Importations statiques
import Hero from "../components/sections/Hero";
import Menu from "../components/sections/Menu";
import AnimatedSection from "../components/Animations/AnimatedSections";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

// Importations dynamiques
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

		const data: ApiResponse = await res.json();
		console.log("API returned", data);
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
			<section className="w-full relative">
				<Image
					src="/images/hero/hero.webp"
					alt="Le Bar du Centre, Arrière-plan"
					fill
					priority
					quality={80}
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
					<Menu menuData={menuData} />
				</div>
			</AnimatedSection>

			<AnimatedSection
				animation="fade-up"
				delay={300}
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Suspense
						fallback={<div>Chargement de la section Privatisation...</div>}
					>
						<Privatize />
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
