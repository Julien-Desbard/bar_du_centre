import Gallery from "@/components/sections/Gallery";
import Bdc_history from "@/components/sections/BdcHistory";
import Staff from "@/components/sections/Staff";
import Suppliers from "@/components/sections/Suppliers";
import Contact from "@/components/sections/Contact";

export default function Discovery() {
	return (
		<main className="scroll-smooth overflow-y-scroll snap-y snap-proximity w-screen h-screen">
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Gallery />
				</div>
			</section>
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Staff />
				</div>
			</section>
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Bdc_history />
				</div>
			</section>
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Suppliers />
				</div>
			</section>
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<Contact />
				</div>
			</section>
		</main>
	);
}
