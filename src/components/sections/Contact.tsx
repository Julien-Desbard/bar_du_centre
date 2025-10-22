import Footer from "../layout/Footer";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import { Button } from "../ui/button";

export default function Contact() {
	const sectionTitle: SectionTitleProps = {
		part1: "nous",
		part2: "contacter",
	};
	return (
		<section
			id="contact"
			className="snap-start h-screen text-white flex flex-col justify-between"
		>
			<SectionTitle sectionTitle={sectionTitle} />
			<article className="pl-6 font-body text-2xl flex flex-col">
				<p>
					Le Bar Du Centre <br />
					12, rue Saint Laud - 49100, Angers
				</p>
				<p>
					Dimanche | Lundi | Mardi: 9h-1h <br />
					Mercredi | Jeudi | Vendredi Samedi: 9h-2h
				</p>
				<p>
					contact@bdc-angers.com <br />
					+33 (0)2 41 87 45 07
				</p>
				<p>
					Bus 7 : République <br /> Bus 10: Mendes France
				</p>
				<p>
					Bus 4 : Foch Maison Bleue <br />
					Tram C : Ralliement
				</p>
			</article>
			<Button>Contactez-nous</Button>
			<Footer />
		</section>
	);
}
