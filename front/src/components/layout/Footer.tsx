import Link from "next/link";

import { InstagramIcon } from "../ui/InstagramIcon";
import { FacebookIcon } from "../ui/FacebookIcon";
import { MailIcon } from "../ui/MailIcon";

// Composant réutilisable pour les liens
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<li>
		<Link
			href={href}
			className="hover:text-secondary transition block"
		>
			{children}
		</Link>
	</li>
);

export default function Footer() {
	return (
		<div className="font-body bg-transparent text-white text-base p-6 border-t-2 border-secondary">
			<div className="max-w-6xl mx-auto">
				{/* Container flex responsive */}
				<div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8 md:gap-12 lg:gap-16">
					
					{/* Bloc Navigation */}
					<div className="flex flex-col items-center md:items-start">
						<h3 className="font-semibold text-lg mb-3 text-secondary">Navigation</h3>
						<ul className="space-y-2">
							<FooterLink href="/#menu">La cantine</FooterLink>
							<FooterLink href="/#private">Privatisation</FooterLink>
							<FooterLink href="/#events">Evénements</FooterLink>
							<FooterLink href="/discovery#gallery">Découvrez-nous</FooterLink>
						</ul>
					</div>

					{/* Bloc Réseaux sociaux */}
					<div className="flex flex-col items-center md:items-start">
						<h3 className="font-semibold text-lg mb-3 text-secondary">Nos réseaux</h3>
						<ul className="space-y-3">
							<li>
								<a 
									href="https://www.facebook.com/barducentreangers/" 
									target="_blank" 
									rel="noopener noreferrer"
									className="hover:text-secondary transition flex items-center gap-2"
								>
									<FacebookIcon size={20} />
									<span>Facebook</span>
								</a>
							</li>
							<li>
								<a 
									href="https://www.instagram.com/barducentre.angers/" 
									target="_blank" 
									rel="noopener noreferrer"
									className="hover:text-secondary transition flex items-center gap-2"
								>
									<InstagramIcon size={20} />
									<span>Instagram</span>
								</a>
							</li>
							<li>
								<a 
									href="mailto:contact@bdc-angers.com" 
									className="hover:text-secondary transition flex items-center gap-2"
								>
									<MailIcon size={20} />
									<span>contact@bdc-angers.com</span>
								</a>
							</li>
						</ul>
					</div>

					{/* Bloc Infos légales */}
					<div className="flex flex-col items-center md:items-start">
						<h3 className="font-semibold text-lg mb-3 text-secondary">Infos légales</h3>
						<ul className="space-y-2">
							<FooterLink href="/legal">Mentions légales</FooterLink>
							<FooterLink href="/legal#politique">Politique de confidentialité</FooterLink>
							<FooterLink href="/legal#accessibilite">Accessibilité</FooterLink>
						</ul>
					</div>

				</div>
			</div>
		</div>
	);
}