import Image from "next/image";
import Link from "next/link";

// Composant réutilisable pour les liens
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<li className="w-full">
		<Link
			href={href}
			className="hover:text-secondary transition block text-center w-full"
		>
			{children}
		</Link>
	</li>
);

export default function Footer() {
	return (
		<div className="font-body bg-transparent text-white text-base flex justify-between max-md:px-0 md:grid md:grid-cols-[auto_1fr_auto] md:items-center px-4">
			<Link href="/#home" className="max-md:flex max-md:items-center">
				<Image
					src="/images/logo_bdc.webp"
					alt="logo du Bar du Centre"
					width={80}
					height={40}
				/>
			</Link>
			
			<div className="grid grid-rows-2 justify-self-center max-md:pr-3 max-md:pl-2">
				<ul className="grid max-sm:grid-cols-2 grid-cols-4 justify-items-center items-center border-b border-secondary max-w-2xl p-1">
					<FooterLink href="/#menu">La cantine</FooterLink>
					<FooterLink href="/#events">Evénements</FooterLink>
					<FooterLink href="/discovery#gallery">Découvrez-nous</FooterLink>
					<FooterLink href="/discovery#contact">Contact</FooterLink>
				</ul>
				
				<ul className="grid max-sm:grid-cols-2 grid-cols-3 justify-items-center items-center max-w-2xl">
					<FooterLink href="/legal#mentions">Mentions légales</FooterLink>
					<li className="w-full max-md:row-span-2">
						<Link href="/legal#policy" className="hover:text-secondary transition block text-center w-full">
							Politique de confidentialité
						</Link>
					</li>
					<FooterLink href="/legal#accessibility">Accessibilité</FooterLink>
				</ul>
			</div>
		</div>
	);
}