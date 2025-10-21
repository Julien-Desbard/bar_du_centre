import React from "react";
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

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { options } = props;
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
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/dj.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									SOIRÉE
								</h3>
								<p className="font-title text-3xl text-shadow-lg">DJ</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							samedi 09.10.25 - ref
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/concert_jazz.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									CONCERT
								</h3>
								<p className="font-title text-3xl text-shadow-lg">JAZZ</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							SAMEDI 16.10.25
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/micro.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									BLINDTEST
								</h3>
								<p className="font-title text-3xl text-shadow-lg">MUSICAL</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							SAMEDI 23.10.25
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/deguisees.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									SOIRÉE
								</h3>
								<p className="font-title text-3xl text-shadow-lg">DEGUISEE</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							samedi 03.11.25
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/dj.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									SOIRÉE
								</h3>
								<p className="font-title text-3xl text-shadow-lg">DJ</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-xl mt-2">
							samedi 09.10.25
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/concert_jazz.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									CONCERT
								</h3>
								<p className="font-title text-3xl text-shadow-lg">JAZZ</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							SAMEDI 16.10.25
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/micro.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									BLINDTEST
								</h3>
								<p className="font-title text-3xl text-shadow-lg">MUSICAL</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							SAMEDI 23.10.25
						</p>
					</div>
					<div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0">
						<div className="relative w-full aspect-square max-w-sm mx-auto">
							<Image
								alt="Soirée DJ"
								src="/images/events/deguisees.png"
								fill
								className="object-contain"
							/>
							<div className="absolute bottom-25 w-full z-50 bg-transparent text-center">
								<h3 className="font-title font-lighter text-5xl text-shadow-lg">
									SOIRÉE
								</h3>
								<p className="font-title text-3xl text-shadow-lg">DEGUISEE</p>
							</div>
						</div>
						<p className="font-body font-semibold text-center text-2xl mt-2">
							samedi 03.11.25
						</p>
					</div>
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
