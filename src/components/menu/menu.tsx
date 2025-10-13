import Image from "next/image";
import { Button } from "../ui/button";

export default function MenuSection() {
	return (
		<section
			id="menu"
			className=" grid auto-rows-min justify-center snap-start relative bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white "
		>
			{/* Menu */}
			<div className="flex">
				<p className="font-subtitle text-6xl text-h2 font-semibold ">
					menu de
				</p>
				<p className="font-subtitle text-6xl font-semibold">la cantine</p>
				<div className="">
					<Image
						className=""
						src="/images/burger_icon.png"
						alt="icone burger pour accéder au menu des plats"
						width={250}
						height={250}
					/>
					<Image
						className=""
						src="/images/beer_icon.png"
						alt="icone bière pour accéder au menu des boissons"
						width={250}
						height={250}
					/>
				</div>
				<p className="font-subtitle text-6xl text-h2 font-semibold">
					carte des
				</p>
				<p className="font-subtitle text-6xl font-semibold">boissons</p>
				<Button
				className="">Réserver une table</Button>
			</div>
			{/* Carte du jour */}
			<div className="f">
				<h2 className="font-body text-5xl">Carte du jour</h2>
				<h3 className="text-3xl font-light text-center">Entrées</h3>
				<ul>
					<li className="text-3xl font-light">
						Soupe de potiron et son lard grillé
					</li>
					<li className="text-3xl font-light">Seconde entrée</li>
				</ul>
				<h3 className="text-3xl font-light text-center">Plats</h3>
				<ul>
					<li className="text-3xl font-light">
						Soupe de potiron et son lard grillé
					</li>
					<li className="text-3xl font-light">Seconde entrée</li>
						</ul>
				<h3 className="text-3xl font-light text-center">Desserts</h3>
				<ul>
					<li className="text-3xl font-light">
						Soupe de potiron et son lard grillé
					</li>
					<li className="text-3xl font-light">Seconde entrée</li>
				</ul>
				<Button>Réserver une table</Button>
			</div>
			{/* Horaires */}
			<div
			className="">
				<h2>Les horaires</h2>
				<ul>
					<li>Lundi | Mardi | Mercredi: 12h-14h15  19h-22h30</li>
					<li>Jeudi: 12h-14h15 || 19h-23h</li>
					<li>Vendredi: 12h-14h30 || 19h-23h</li>
					<li>Samedi: 12h-15h30 || 19h-23h </li>
					<li>Dimanche: 12h-15h || 19h-22h30</li>
				</ul>
			</div>
		</section>
	);
}
