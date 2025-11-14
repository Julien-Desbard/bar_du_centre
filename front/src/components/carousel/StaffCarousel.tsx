"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
	options?: EmblaOptionsType;
};

type StaffData = {
	id: number;
	documentId: string;
	titre: string;
	sous_titre: string | null;

	photo: Array<{
		id: number;
		url: string;
		alternativeText: string | null;
		formats: {
			medium?: {
				url: string;
			};
			small?: {
				url: string;
			};
		};
	}>;
};

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
	const defaultOptions: EmblaOptionsType = {
		loop: true,
		align: "start",
		skipSnaps: false,
		...options,
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);
	const [staff, setStaff] = useState<StaffData[]>([]);
	const [loading, setLoading] = useState(true);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	useEffect(() => {
		const fetchStaff = async () => {
			try {
				const response = await fetch(
					"https://light-cheese-efa53451a5.strapiapp.com/api/equipes?populate=*&sort=createdAt:asc"
				);
				const data = await response.json();

				setStaff(data.data);
			} catch (error) {
				console.error("Erreur lors du chargement du staff:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStaff();
	}, []);

	if (loading) {
		return (
			<div className="w-full text-center py-10">
				<p className="font-body text-xl">Chargement du staff...</p>
			</div>
		);
	}

	if (staff.length === 0) {
		return (
			<div className="w-full text-center py-10">
				<p className="font-body text-xl">Aucun membre du staff trouvé.</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{staff.map((item) => (
						<div
							key={item.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0"
						>
							{item.photo && item.photo.length > 0 && (
								<div className="relative w-[90%] aspect-square max-w-sm mx-auto">
									<Image
										alt={
											item.photo[0]?.alternativeText ||
											`${item.titre.toLowerCase()} ${
												item.sous_titre ? item.sous_titre.toLowerCase() : ""
											}`
										}
										src={
											item.photo[0]?.formats?.medium?.url ||
											item.photo[0]?.formats?.small?.url ||
											item.photo[0]?.url
										}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
										className="object-cover"
									/>
									<div className="absolute max-lg:bottom-15 bottom-25 w-full z-50 bg-transparent text-center h-10">
										<h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg">
											{item.titre.toUpperCase()}
										</h3>

										{item.sous_titre && (
											<p className="font-title max-md:text-2xl text-3xl text-shadow-lg">
												{item.sous_titre}
											</p>
										)}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center px-4">
				<div className="flex gap-2">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
