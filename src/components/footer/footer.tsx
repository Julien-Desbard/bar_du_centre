import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="font-body bg-transparent text-white text-base flex justify-between max-md:px-0 md:grid md:grid-cols-[auto_1fr_auto] md:items-center px-4">
			<Link href="/#home"
      className="max-md:flex max-md:items-center pb-">
				<Image
					src="/images/logo_bdc.webp"
					alt="logo du Bar du Centre"
					width={80}
					height={40}
				/>
			</Link>
			<div className="grid grid-rows-2 justify-self-center max-md:pr-3 max-md:pl-2">
				<ul className="grid max-sm:grid-cols-2 grid-cols-4 justify-items-center items-center border-b-secondary border-secondary border-b-1 max-w-2xl p-1">
					<li className="w-full">
						<Link
							href="/#menu"
							className="hover:text-secondary transition block text-center w-full"
						>
							La cantine
						</Link>
					</li>
					<li className="w-full">
						<Link
							href="/#events"
							className="hover:text-secondary transition block text-center w-full"
						>
							Evénements
						</Link>
					</li>
					<li className="w-full">
						<Link
							href="/discovery#gallery"
							className="hover:text-secondary transition block text-center w-full"
						>
							Découvrez-nous
						</Link>
					</li>
					<li className="w-full">
						<Link
							href="/discovery#contact"
							className="hover:text-secondary transition block text-center w-full"
						>
							Contact
						</Link>
					</li>
				</ul>
				<ul className="grid max-sm:grid-cols-2 grid-cols-3 justify-items-center items-center max-w-2xl">
					<li className="w-full">
						<Link
							href="/legal#mentions"
							className="hover:text-secondary transition block text-center w-full"
						>
							Mentions légales
						</Link>
					</li>
					<li className="w-full max-md:row-span-2">
						<Link
							href="/legal#policy"
							className="hover:text-secondary transition block text-center w-full "
						>
							Politique de confidentialité
						</Link>
					</li>
					<li className="w-full">
						<Link
							href="/legal#accessibility"
							className="hover:text-secondary transition block text-center w-full"
						>
							Accessibilité
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
