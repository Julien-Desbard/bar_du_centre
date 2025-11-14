"use client";
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

	return (
		<div className="w-full mt-12">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex touch-pan-y">
					{supplierContent.map((item) => (
						<div
							key={item.id}
							className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 px-2"
						>
							<Link
								href={item.url}
								className="block transition-transform delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:opacity-90"
							>
								<div className="relative w-full aspect-square max-w-sm mx-auto">
									<Image
										alt={item.name}
										src={`/images/suppliers/${item.slug}.png`}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
										className="object-cover"
									/>
								</div>
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
