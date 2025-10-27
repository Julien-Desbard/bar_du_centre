import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { SupplierContent } from "../sections/Suppliers";
import Link from "next/link";

type PropType = {
	options?: EmblaOptionsType;
	supplierContent: SupplierContent[];
};

const EmblaCarousel: React.FC<PropType> = ({ options, supplierContent }) => {
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
					{supplierContent.map((item) => (
						<div
							key={item.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2 flex-shrink-0 hover:bg-secondary/70 transition delay-100 duration-300 ease-in-out hover:-translate-y-1"
						>
								<Link
                                href={item.url}>
							<div className="relative w-full aspect-square max-w-sm max-sm:max-w-3xs xl:max-w-xs mx-auto">
								<Image
									alt={`${item.name}`}
									src={`/images/suppliers/${item.slug}.png`}
									fill
									className="object-cover"
                                    />
							</div>
							{/* <p className="font-body text-center text-xl mt-2">
                                    {item.name.toUpperCase()}
							</p> */}
                                </Link>
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
