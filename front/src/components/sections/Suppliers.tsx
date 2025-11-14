import React from "react";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import Carousel from "../carousel/SupplierCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "@/styles/embla.css";
import ReservationTrigger from "../modals/reservationTrigger";

export type SupplierContent = {
	id: number;
	name: string;
	slug: string;
	url: string;
};

const sectionTitle: SectionTitleProps = {
	part1: "nos",
	part2: "fournisseurs",
};

export default function Suppliers() {
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	const supplierContent: SupplierContent[] = [
		{
			id: 1,
			slug: "alpaca",
			name: "alpaca",
			url: "https://www.brasseriealpaca.com/",
		},
		{
			id: 2,
			slug: "anjou",
			name: "anjou pâtes fraîches",
			url: "https://www.anjou-pates-fraiches.com/",
		},
		{
			id: 3,
			slug: "brulerie",
			name: "brulerie de la maine",
			url: "https://www.bruleriedelamaine.fr/",
		},
		{
			id: 4,
			slug: "cocagne",
			name: "cocagne",
			url: "https://www.facebook.com/BoulangerieLaCocagne/",
		},
		{ id: 5, slug: "ducret", name: "ducret", url: "https://maisonducret.com/" },
		{
			id: 6,
			slug: "honorance",
			name: "honorance",
			url: "https://www.honorance.fr/",
		},
		{
			id: 7,
			slug: "jagastronomie",
			name: "ja gastronomie",
			url: "https://www.jagastronomie.com/",
		},
		{
			id: 8,
			slug: "melusine",
			name: "melusine",
			url: "https://www.brasserie-melusine.com/",
		},
		{
			id: 9,
			slug: "meteor",
			name: "meteor",
			url: "https://www.brasserie-meteor.fr/",
		},
		{
			id: 10,
			slug: "pain",
			name: "maison du pain",
			url: "https://www.facebook.com/lamaisondupainangers/",
		},
		{
			id: 11,
			slug: "plumejeau",
			name: "plumejeau",
			url: "https://www.plumejeau.fr/",
		},
	];
	return (
		<section
			id="gallery"
			className="snap-start relative text-white overflow-hidden min-h-screen max-sm:pt-10"
		>
			<div className="w-full h-full flex flex-col justify-between items-center mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start">
					<h2 className="font-body max-sm:text-2xl text-3xl m-6">
						Des artisans <span className="text-secondary">indépendants</span> et{" "}
						<span className="text-secondary">locaux</span>
					</h2>
				</div>
				<div className="w-full px-6 mb-6">
					<Carousel options={OPTIONS} supplierContent={supplierContent} />
				</div>
				<div>
					<ReservationTrigger />
				</div>
			</div>
		</section>
	);
}
