import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { BrasserieContent } from "../sections/Gallery";

type PropType = {
	options?: EmblaOptionsType;
	brasserieContent: BrasserieContent[];
};

const EmblaCarousel: React.FC<PropType> = ({ options, brasserieContent }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<div className="w-full mt-12">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{brasserieContent.map((item) => (
						<div
							key={item.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2 flex-shrink-0"
						>
							<div className="relative w-full aspect-square max-w-sm max-sm:max-w-3xs xl:max-w-xs mx-auto">
								<Image
									alt={`${item.name}`}
									src={`/images/gallery/${item.id}.jpg`}
									fill
									className="object-cover"
								/>
								<div className="absolute max-lg:bottom-15 bottom-25 w-full z-50 bg-transparent text-center h-10">
									<h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg h-full flex items-start justify-center">
										{item.name.toUpperCase()}
									</h3>
								</div>
							</div>
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
