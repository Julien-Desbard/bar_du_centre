import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

export default function InfosLegales() {
	const sectionTitle: SectionTitleProps = {
		part1: "infos",
		part2: "légales",
	};

	return (
		<div className="w-full flex flex-col items-center mx-auto gap-y-10 md:gap-y-12 text-white">
			<SectionTitle sectionTitle={sectionTitle} />

			<div className="w-full max-w-5xl space-y-10 text-sm md:text-base leading-relaxed">
				
				{/* MENTIONS LÉGALES */}
				<section 
                id="mentions"
                className="space-y-2">
					<h3 className="text-2xl font-semibold uppercase tracking-wide border-b border-secondary pb-2 text-secondary">
						Mentions legales
					</h3>

					<p className="underline">Éditeur du site</p>
					<p>
						Le Bar du Centre<br />
						SARL au capital social 30.000€<br />
						SIREN : 398 643 353<br />
						SIRET (siège) : 398 643 353 00020<br />
						TVA intracommunautaire : FR96398643353<br />
						Adresse : 12 Rue Saint-Laud, 49100 Angers, France<br />
						Activité : Hôtels et hébergement similaire (5510Z)<br />
						Email : contact@bdc-angers.com<br />
						Téléphone : 02-41-87-45-07
					</p>

					<p className="underline mt-3">Responsable de la publication</p>
					<p>
						Mani Saeidi Akbarzadeh (Gérant)<br />
						Arash Saeidi Akbarzadeh
					</p>

					<p className="underline mt-3">Création du site</p>
					<p>
						Site développé par : <a href="https://www.linkedin.com/in/julien-desbard/">Julien Desbard </a><br />
						Année de création : 2025
					</p>

					<p className="underline mt-3">Hébergement</p>
					<p>
						Hébergeur : LWS<br />
						Adresse : 10, RUE PENTHIEVRE - 75008 PARIS - FRANCE<br />
						Téléphone : 01-77-62-30-03
					</p>

					<p className="underline mt-3">Propriété intellectuelle</p>
					<p>
						L&apos;ensemble des contenus du site (textes, images, logos) demeure la
						propriété exclusive du Bar du Centre ou de ses partenaires.
						Toute reproduction partielle ou totale sans autorisation est interdite.
					</p>
				</section>


				{/* POLITIQUE DE CONFIDENTIALITÉ */}
				<section id="politique"
                className="space-y-3 ">
					<h3 className="text-2xl font-semibold uppercase tracking-wide border-b border-secondary pb-2 text-secondary">
						Politique de confidentialité
					</h3>

					<p>
						Le Bar du Centre collecte uniquement les données strictement nécessaires
						au traitement de vos demandes (contact, réservations).
					</p>

					<p className="underline">Données collectées</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Données d’identification (nom, email, téléphone, message).</li>
						<li>Données de navigation anonymisées (mesure d’audience).</li>
					</ul>

					<p className="underline mt-3">Finalité</p>
					<p>
						Vos données ne sont utilisées que pour répondre à vos sollicitations
						et améliorer votre expérience sur le site.
					</p>

					<p className="underline mt-3">Conservation</p>
					<p>
						Les données de contact sont conservées uniquement pendant la durée
						nécessaire au traitement de votre demande.
					</p>

					<p className="underline mt-3">Vos droits</p>
					<p>
						Vous disposez d’un droit d’accès, de rectification et de suppression
						de vos données. Pour l’exercer, contactez-nous à :
						<br />
						Email : contact@gdc-angers.com
					</p>
				</section>


				{/* ACCESSIBILITÉ */}
				<section id="accessibilite"
                className="space-y-3 mb-10 ">
					<h3 className="text-2xl font-semibold uppercase tracking-wide border-b border-secondary pb-2 text-secondary">
						Accessibilité
					</h3>

					<p>
						Le Bar du Centre s’engage à améliorer progressivement l’accessibilité du site,
						afin qu’il soit utilisable par tous les internautes, y compris en situation
						de handicap.
					</p>
					<p>
						Si vous rencontrez une difficulté d’accès à un contenu,
						merci de nous en informer à : contact@gdc-angers.com.
					</p>
				</section>
			</div>
		</div>
	);
}
