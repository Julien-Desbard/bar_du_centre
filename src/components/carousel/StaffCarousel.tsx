import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { StaffContent } from "../sections/Staff";

type PropType = {
    options?: EmblaOptionsType;
    staffContent: StaffContent[];
};

const EmblaCarousel: React.FC<PropType> = ({ options, staffContent }) => {
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

                    {staffContent.map((item) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex-shrink-0"
                        >
                            <div className="relative w-full aspect-square max-w-sm mx-auto">
                                <Image
                                    alt={`${item.name}`}
                                    src={`/images/staff/${item.name}.jpg`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute max-lg:bottom-15 bottom-25 w-full z-50 bg-transparent text-center">
                                    <h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg">
                                        {item.name.toUpperCase()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center mt-16 px-4">
                <div className="flex gap-2">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
