// components/AnimatedSection.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

type AnimationType =
	| "fade-up"
	| "fade-down"
	| "fade-left"
	| "fade-right"
	| "zoom"
	| "fade";

interface AnimatedSectionProps {
	children: ReactNode;
	className?: string;
	animation?: AnimationType;
	delay?: number;
	threshold?: number;
}

export default function AnimatedSection({
	children,
	className = "",
	animation = "fade-up",
	delay = 0,
	threshold = 0.2,
}: AnimatedSectionProps) {
	const { ref, isVisible } = useScrollAnimation({
		threshold,
		triggerOnce: true,
	});

	const animationClasses = {
		"fade-up": "translate-y-12 opacity-0",
		"fade-down": "-translate-y-12 opacity-0",
		"fade-left": "translate-x-12 opacity-0",
		"fade-right": "-translate-x-12 opacity-0",
		zoom: "scale-95 opacity-0",
		fade: "opacity-0",
	};

	const visibleClasses = "translate-y-0 translate-x-0 scale-100 opacity-100";

	return (
		<section
			ref={ref}
			className={`transition-all duration-1000 ease-out ${
				isVisible ? visibleClasses : animationClasses[animation]
			} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</section>
	);
}
