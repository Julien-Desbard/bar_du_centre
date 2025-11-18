import Gallery from "@/components/sections/Gallery";
import Bdc_history from "@/components/sections/BdcHistory";
import Staff from "@/components/sections/Staff";
import Suppliers from "@/components/sections/Suppliers";

import AnimatedSection from "@/components/Animations/AnimatedSections";
import Footer from "@/components/layout/Footer";

export default function Discovery() {
	return (
		<>
			<section className="snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Gallery />
				</div>
			</section>
			<AnimatedSection
				animation="fade-up"
				threshold={0.1}
				delay={600}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Staff />
				</div>
			</AnimatedSection>
			<AnimatedSection
				animation="fade-up"
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Bdc_history />
				</div>
			</AnimatedSection>
			<AnimatedSection
				animation="fade-up"
				delay={100}
				threshold={0.1}
				className="snap-start w-full"
			>
				<div className="max-w-[1280px] mx-auto">
					<Suppliers />
				</div>
			</AnimatedSection>
			<div className="max-w-[1280px] mx-auto">
				<Footer />
			</div>
		</>
	);
}
