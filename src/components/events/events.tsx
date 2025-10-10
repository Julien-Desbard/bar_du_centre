import Footer from "../footer/footer";

export default function Events() {
	return (
		<section
			id="events"
			className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white flex flex-col justify-between"
		>
			<div className="pt-24 pl-24">
				<p className="font-subtitle text-5xl text-h2 font-bold">nos</p>
				<p className="font-subtitle text-5xl font-bold">événements</p>
				<div>
					nos événements
				</div>
			</div>
			<Footer />
		</section>
	);
}
