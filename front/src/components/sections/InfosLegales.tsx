import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function InfosLegales() {
	const sectionTitle: SectionTitleProps = {
		part1: "infos",
		part2: "légales",
	};

	return (
		<div className="w-full flex flex-col items-center mx-auto gap-y-10 md:gap-y-12 text-white">
			<SectionTitle sectionTitle={sectionTitle} />

			<div className="w-full max-w-5xl space-y-10 text-sm md:text-base leading-relaxed">
				{/* MENTIONS LÉGALES (Déjà fait) */}
				<section id="mentions" className="space-y-2">
					<h3 className="text-2xl font-semibold uppercase tracking-wide border-b border-secondary pb-2 text-secondary">
						Mentions legales
					</h3>

					<Accordion type="single" collapsible>
						<AccordionItem value="mentions-item-1">
							<AccordionTrigger className="text-base">
								Éditeur du site
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Le Bar du Centre
									<br />
									SARL au capital social 30.000€
									<br />
									SIREN : 398 643 353
									<br />
									SIRET (siège) : 398 643 353 00020
									<br />
									TVA intracommunautaire : FR96398643353
									<br />
									Adresse : 12 Rue Saint-Laud, 49100 Angers, France
									<br />
									Activité : Hôtels et hébergement similaire (5510Z)
									<br />
									Email : contact@bdc-angers.com
									<br />
									Téléphone : 02-41-87-45-07
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="mentions-item-2">
							<AccordionTrigger className="text-base">
								Responsable de la publication
							</AccordionTrigger>
							<AccordionContent>
								<p>
									{" "}
									Mani Saeidi Akbarzadeh (Gérant)
									<br /> Arash Saeidi Akbarzadeh
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="mentions-item-3">
							<AccordionTrigger className="text-base">
								Création du site
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Site développé par :{" "}
									<a href="https://www.linkedin.com/in/julien-desbard/">
										Julien Desbard{" "}
									</a>
									<br />
									Année de création : 2025
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="mentions-item-4">
							<AccordionTrigger className="text-base">
								Hébergement & Propriété intellectuelle
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Hébergeur : LWS
									<br />
									Adresse : 10, RUE PENTHIEVRE - 75008 PARIS - FRANCE
									<br />
									Téléphone : 01-77-62-30-03
								</p>

								<p className="underline mt-3">Propriété intellectuelle</p>
								<p>
									L&apos;ensemble des contenus du site (textes, images, logos)
									demeure la propriété exclusive du Bar du Centre ou de ses
									partenaires. Toute reproduction partielle ou totale sans
									autorisation est interdite.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				{/* POLITIQUE DE CONFIDENTIALITÉ (Nouveau Accordion) */}
				<section id="politique" className="space-y-3 ">
					<h3 className="text-2xl font-semibold uppercase tracking-wide border-b border-secondary pb-2 text-secondary">
						Politique de confidentialité
					</h3>

					<Accordion type="single" collapsible>
						<AccordionItem value="politique-item-1">
							<AccordionTrigger className="text-base">
								Données collectées
							</AccordionTrigger>
							<AccordionContent>
								<ul className="list-disc list-inside space-y-1">
									<li>
										Le Bar du Centre collecte uniquement les données strictement
										nécessaires au traitement de vos demandes (contact,
										réservations).
									</li>
									<li>
										Données d’identification (nom, email, téléphone, message).
									</li>
									<li>
										Données de navigation anonymisées (mesure d’audience).
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="politique-item-2">
							<AccordionTrigger className="text-base">
								Finalité
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Vos données ne sont utilisées que pour répondre à vos
									sollicitations et améliorer votre expérience sur le site.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="politique-item-3">
							<AccordionTrigger className="text-base">
								Conservation
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Les données de contact sont conservées uniquement pendant la
									durée nécessaire au traitement de votre demande.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="politique-item-4">
							<AccordionTrigger className="text-base">
								Vos droits
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Vous disposez d’un droit d’accès, de rectification et de
									suppression de vos données. Pour l’exercer, contactez-nous à :
									<br />
									Email : contact@gdc-angers.com
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				{/* ACCESSIBILITÉ (Nouveau Accordion) */}
				<section id="accessibilite" className="space-y-3 mb-10 ">
					<h3 className="text-2xl font-semibold uppercase tracking-wide border-b border-secondary pb-2 text-secondary">
						Accessibilité
					</h3>

					<Accordion type="single" collapsible>
						<AccordionItem value="accessibilite-item-1">
							<AccordionTrigger className="text-base">
								Engagement
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Le Bar du Centre s’engage à améliorer progressivement
									l’accessibilité du site, afin qu’il soit utilisable par tous
									les internautes, y compris en situation de handicap.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="accessibilite-item-2">
							<AccordionTrigger className="text-base">
								Signalement
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Si vous rencontrez une difficulté d’accès à un contenu, merci
									de nous en informer à : contact@gdc-angers.com.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
			</div>
		</div>
	);
}
