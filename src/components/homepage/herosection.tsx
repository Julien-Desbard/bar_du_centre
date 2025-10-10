import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section
			id="home"
			className="snap-start bg-[url('/images/beer.jpg')] bg-cover bg-center h-screen text-center flex items-center max-lg:justify-center"
		>
			<div className="px-24 max-lg:flex max-lg:items-center max-lg:flex-col max-sm:px-6">
				<h1 className="font-title text-5xl pb-12 text-white ">LE BAR DU CENTRE</h1>
				<h2 className="font-subtitle pb-14 text-2xl text-white">
					En plein coeur d&apos;Angers, le{" "}
					<span className="text-secondary">BDC</span> pour les intîmes
				</h2>
				<Button>Réserver une table</Button>
			</div>
		</section>
	);
}
