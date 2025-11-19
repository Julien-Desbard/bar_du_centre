import { MenuItem, CarteItems, EventItem } from "@/@types";
import Image from "next/image";

import Hero from "../components/sections/Hero";
import Menu from "../components/sections/Menu";
import AnimatedSection from "../components/Animations/AnimatedSections";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Privatize from "@/components/sections/Privatize";
import Events from "@/components/sections/Events";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

async function getAllData() {
	try {
		const [carteRes, platsRes, boissonsRes, eventRes] = await Promise.all([
			fetch(`${BASE_URL}carte`, { next: { revalidate: 300 } }),
			fetch(`${BASE_URL}menu/cat/plats`, { next: { revalidate: 86400 } }),
			fetch(`${BASE_URL}menu/cat/boissons`, { next: { revalidate: 86400 } }),
			fetch(`${STRAPI_URL}evenements?populate=*&sort=createdAt:asc`, {
				next: { revalidate: 86400 },
			}),
		]);

		const carteData = carteRes.ok ? await carteRes.json() : null;
		const platsData = platsRes.ok ? await platsRes.json() : null;
		const boissonsData = boissonsRes.ok ? await boissonsRes.json() : null;
		const eventsData = eventRes.ok ? await eventRes.json() : null;

		return {
			carteData: (carteData?.allCarteItems || []) as CarteItems[],
			platsMenu: (platsData?.menuItemsPerCat1 || []) as MenuItem[],
			boissonsMenu: (boissonsData?.menuItemsPerCat1 || []) as MenuItem[],
			eventData: (eventsData?.data || []) as EventItem[],
		};
	} catch (error) {
		console.error("Erreur lors du fetch des données:", error);
		return {
			carteData: [],
			platsMenu: [],
			boissonsMenu: [],
			eventData: [],
		};
	}
}

export default async function Home() {
	const { carteData, platsMenu, boissonsMenu, eventData } = await getAllData();

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
					<Events eventData={eventData} />
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
