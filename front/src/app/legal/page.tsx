import Footer from "@/components/layout/Footer";
import InfosLegales from "@/components/sections/InfosLegales";

export default function InfosLegalesPage() {
	return (
		<div>
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full flex flex-col items-center justify-center px-4 pt-12">
					<InfosLegales />
				</div>
			<div className="max-w-[1280px] mx-auto">
				<Footer />
			</div>
			</section>
		</div>
	);
}
