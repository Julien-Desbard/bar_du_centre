"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { GalleryItems } from "@/@types";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
	options?: EmblaOptionsType;
	galleryData: GalleryItems[];
};

const EmblaCarousel: React.FC<PropType> = ({ options, galleryData }) => {
	const defaultOptions: EmblaOptionsType = {
		loop: true,
		align: "start",
		skipSnaps: false,
		...options,
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	if (!galleryData || galleryData.length === 0) {
		return (
			<div className="w-full text-center py-10">
				<p className="font-body text-xl">Aucun élément de galerie trouvé.</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{galleryData.map((item) => (
						<div
							key={item.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] flex-shrink-0"
						>
							{item.photo && item.photo.length > 0 && (
								<div className="relative w-[90%] aspect-square max-w-sm mx-auto">
									<Image
										alt={
											item.photo[0]?.alternativeText ||
											`${item.titre.toLowerCase()}`
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
										<h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg h-full flex items-start justify-center">
											{item.titre.toUpperCase()}
										</h3>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center mt-2">
				<div className="flex gap-2 ">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
