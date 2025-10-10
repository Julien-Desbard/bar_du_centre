import Footer from "../footer/footer";

export default function Contact() {
	return (
		<section
			id="contact"
			className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white flex flex-col justify-between"
		>
			<h2 className="pt-24 pl-24">
				<p className="font-subtitle text-5xl text-h2 font-bold">nous</p>
				<p className="font-subtitle text-5xl font-bold">trouver</p>
			</h2>
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
			<Footer />
		</section>
	);
}
