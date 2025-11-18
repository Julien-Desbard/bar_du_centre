"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import "@/styles/embla.css";
import Image from "next/image";
import { EventItem } from "@/@types";

type PropType = {
	options?: EmblaOptionsType;
	eventData: EventItem[];
};

const EmblaCarousel = ({ options, eventData }: PropType) => {
const defaultOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  containScroll: "trimSnaps",
  skipSnaps: true,             
  ...options,
};

	const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	if (!eventData || eventData.length === 0) {
		return (
			<div className="w-full text-center py-8">
				<p className="text-white/60">Aucun événement à afficher</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex touch-pan-y">
					{eventData.map((event) => (
						<div
							key={event.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2"
						>
							{event.photo && event.photo.length > 0 && (
								<div className="relative w-[90%] mx-auto aspect-square overflow-hidden">
									<Image
										alt={
											event.photo[0]?.alternativeText ||
											`${event.titre.toLowerCase()} ${(
												event.sous_titre || ""
											).toLowerCase()}`
										}
										src={event.photo[0]?.url}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
										className="object-cover"
									/>
									<div className="absolute max-lg:bottom-20 bottom-25 w-full z-50 bg-transparent text-center h-10">
										<h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg">
											{event.titre.toUpperCase()}
										</h3>
										<p className="font-title max-md:text-2xl text-3xl text-shadow-lg">
											{(event.sous_titre || "").toUpperCase()}
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

			<div className="flex items-center justify-center mt-2">
				<div className="flex gap-2">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;