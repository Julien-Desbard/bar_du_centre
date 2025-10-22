import Gallery from "@/components/sections/Gallery";
import Bdc_history from "@/components/sections/BdcHistory";
import Staff from "@/components/sections/Staff";
import Suppliers from "@/components/sections/Suppliers";
import Contact from "@/components/sections/Contact";

export default function Discovery() {
	return (
		<main className="scroll-smooth overflow-y-scroll snap-y snap-proximity h-screen">
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Gallery />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Staff />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Bdc_history />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Suppliers />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Contact />
				</div>
			</section>
		</main>
	);
}
