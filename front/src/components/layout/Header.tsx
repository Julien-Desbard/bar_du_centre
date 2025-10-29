"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BurgerMenu from "./BurgerMenu";

// Creating Nav menu
type NavItem = {
	href: string;
	label: string;
};

const Nav: NavItem[] = [
	{ href: "/#home", label: "ACCUEIL" },
	{ href: "/#menu", label: "LE BDC" },
	{ href: "/#private", label: "PRIVATISATION" },
	{ href: "/#events", label: "EVENEMENTS" },
	{ href: "/discovery#gallery", label: "DECOUVREZ-NOUS" },
	{ href: "/discovery#contact", label: "CONTACT" },
];

export default function Header() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<string>("");

	const activePath = activeSection ? `${pathname}#${activeSection}` : pathname;

	// Initialiser la section active au chargement
	useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash.replace("#", "");
			if (hash) {
				setActiveSection(hash);
			}
		}
	}, []);

	// Écouter les changements de hash (clic sur liens)
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.replace("#", "");
			setActiveSection(hash);
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	// Détecter les sections actives lors du scroll
	useEffect(() => {
		const sections = document.querySelectorAll("section[id]");

		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						setActiveSection(sectionId);

						// Mettre à jour l'URL sans recharger
						window.history.replaceState(null, "", `${pathname}#${sectionId}`);
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: "-80px 0px -50% 0px",
			}
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, [pathname]);

	return (
		<header className="sticky top-0 w-full z-50">
			<nav
				aria-label="navigation principale"
				className="flex items-center justify-end font-title text-white text-xl"
			>
				<div className="fixed top-0 right-0 z-50">
					<BurgerMenu nav={Nav} />
				</div>
				<ul className="flex items-center gap-6 p-6 pr-10 tracking-wide">
					{/* Mapping Nav to create the menu */}
					{Nav.map(({ href, label }) => {
						const isActive = href === activePath;
						return (
							<li key={href}>
								<Link
									href={href}
									className={`hover:text-secondary transition-colors duration-300 ease-in-out lg:block hidden ${
										isActive
											? "underline underline-offset-8 decoration-secondary"
											: ""
									}`}
									aria-current={isActive ? "page" : undefined}
								>
									{label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
