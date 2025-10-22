import Gallery from "@/components/gallery/gallery";
import Bdc_history from "@/components/bdc_history/bdc_history";
import Staff from "@/components/staff/staff";
import Suppliers from "@/components/suppliers/suppliers";
import Contact from "@/components/contact/contact";

export default function Discovery() {
	return (
		<main className="scroll-smooth overflow-y-scroll snap-y snap-proximity h-screen">
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Gallery />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Staff />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Bdc_history />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Suppliers />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Contact />
				</div>
			</section>
		</main>
	);
}
