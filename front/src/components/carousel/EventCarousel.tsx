"use client";

import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import "@/styles/embla.css";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
	options?: EmblaOptionsType;
};

type EventData = {
	id: number;
	documentId: string;
	titre: string;
	sous_titre: string;
	jour: string;
	date: string;
	photo: Array<{
		id: number;
		url: string;
		alternativeText: string | null;
		formats: {
			medium?: {
				url: string;
			};
		};
	}>;
};

const EmblaCarousel = ({ options }: PropType) => {
	const defaultOptions: EmblaOptionsType = {
		loop: true,
		align: "start",
		skipSnaps: false,
		containScroll: "trimSnaps",
		...options,
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);
	const [events, setEvents] = useState<EventData[]>([]);
	const [loading, setLoading] = useState(true);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://light-cheese-efa53451a5.strapiapp.com/api/evenements?populate=*&sort=createdAt:asc"
				);
				const data = await response.json();
				setEvents(data.data);
			} catch (error) {
				console.error("Erreur lors du chargement des événements:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	if (loading) {
		return (
			<div className="w-full text-center py-10">
				<p className="font-body text-xl">Chargement des événements...</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{events.map((event) => (
						<div
							key={event.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2"
						>
							{event.photo && event.photo.length > 0 && (
								<div className="relative w-[90%] mx-auto aspect-square overflow-hidden">
									<Image
										alt={
											event.photo[0]?.alternativeText ||
											`${event.titre.toLowerCase()} ${event.sous_titre.toLowerCase()}`
										}
										src={
											event.photo[0]?.formats?.medium?.url ||
											event.photo[0]?.url
										}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
										className="object-cover"
									/>
									<div className="absolute max-lg:bottom-20 bottom-25 w-full z-50 bg-transparent text-center h-10">
										<h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg">
											{event.titre.toUpperCase()}
										</h3>
										<p className="font-title max-md:text-2xl text-3xl text-shadow-lg">
											{event.sous_titre.toUpperCase()}
										</p>
										<p className="font-body text-center text-xl mt-2 mb-2">
											{event.jour} {event.date}
										</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center">
				<div className="flex gap-2">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
