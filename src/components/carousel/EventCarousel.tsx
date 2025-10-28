"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import "@/styles/embla.css";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Content } from "../sections/Events";

type PropType = {
	options?: EmblaOptionsType;
	imageContent: Content[];
};

const EmblaCarousel = ({ options, imageContent }:PropType) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<div className="w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{imageContent.map((item) => (
						<div
							key={item.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2 flex-shrink-0"
						>
							<div className="relative w-full aspect-square max-w-sm mx-auto">
								<Image
									alt={`${item.title.toLocaleLowerCase()} ${item.subtitle.toLocaleLowerCase()}`}
									src={`/images/events/${item.name}.png`}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
									className="object-contain"
								/>
								<div className="absolute max-lg:bottom-15 bottom-25 w-full z-50 bg-transparent text-center h-10">
									<h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg">
										{item.title}
									</h3>
									<p className="font-title max-md:text-2xl text-3xl text-shadow-lg">
										{item.subtitle}
									</p>
								</div>
							</div>
							<p className="font-body text-center text-xl mt-2">
								{item.jour} {item.date}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center mt-6 px-4">
				<div className="flex gap-2">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
