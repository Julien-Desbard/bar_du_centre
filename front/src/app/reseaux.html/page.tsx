import Footer from "@/components/layout/Footer";
import Reseaux from "@/components/sections/Reseaux";

export default function Home() {
	return (
		<div>
			<section className="w-full h-screen flex flex-col justify-between">
				<div className="max-w-[1280px] w-full mx-auto">
					<Reseaux />
				</div>
				<div className="max-w-[1280px] w-full mx-auto">
					<Footer />
				</div>
			</section>
		</div>
	);
}