import Gallery from "@/components/sections/Gallery";
import Bdc_history from "@/components/sections/BdcHistory";
import Staff from "@/components/sections/Staff";
import Suppliers from "@/components/sections/Suppliers";

import AnimatedSection from "@/components/Animations/AnimatedSections";
import Footer from "@/components/layout/Footer";
import { GalleryItems, StaffItems } from "@/@types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

async function getAllDiscoveryData() {
	try {
		const [galleryResponse, staffResponse] = await Promise.all([
			fetch(`${STRAPI_URL}galeries?populate=*&sort=createdAt:asc`, {
				next: { revalidate: 86400 },
			}),
			fetch(`${STRAPI_URL}equipes?populate=*&sort=createdAt:asc`, {
				next: { revalidate: 86400 },
			}),
		]);

		const galleriesData = galleryResponse.ok
			? await galleryResponse.json()
			: null;
		const staffsData = staffResponse.ok ? await staffResponse.json() : null;

		return {
			galleryData: (galleriesData?.data || []) as GalleryItems[],
			staffData: (staffsData?.data || []) as StaffItems[],
		};
	} catch (error) {
		console.error("Erreur lors du fetch des données:", error);
		return {
			galleryData: [],
			staffData: [],
		};
	}
}

export default async function Discovery() {
	const { galleryData, staffData } = await getAllDiscoveryData();
	return (
		<>
			<section className="snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Gallery galleryData={galleryData} />
				</div>
			</section>
			<AnimatedSection
				animation="fade-up"
				threshold={0.1}
				delay={600}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Staff staffData={staffData} />
				</div>
			</AnimatedSection>
			<AnimatedSection
				animation="fade-up"
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Bdc_history />
				</div>
			</AnimatedSection>
			<AnimatedSection
				animation="fade-up"
				delay={100}
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Suppliers />
				</div>
			</AnimatedSection>
			<div className="max-w-[1280px] mx-auto">
				<Footer />
			</div>
		</>
	);
}
