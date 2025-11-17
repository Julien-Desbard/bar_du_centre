"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import { useSession } from "next-auth/react";
import SignOffButton from "../buttons/signOffButton";

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
	{ href: "/#contact", label: "CONTACT" },
	{ href: "/discovery#gallery", label: "DECOUVREZ-NOUS" },
];

export default function Header() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<string>("");

	const activePath = activeSection ? `${pathname}#${activeSection}` : pathname;


	useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash.replace("#", "");
			if (hash) {
				setActiveSection(hash);
			}
		}
	}, []);


	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.replace("#", "");
			setActiveSection(hash);
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);


	useEffect(() => {
		const sections = document.querySelectorAll("section[id]");

		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						setActiveSection(sectionId);

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

	const { data: session } = useSession();

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
					{session && (
						<div className="flex flex-row gap-6">
							<SignOffButton/>
							<Link href="/admin" className="text-secondary self-center">
								ADMIN
							</Link>
						</div>
					)}
					{Nav.map(({ href, label }) => {
						const isActive = href === activePath;
						return (
							<li key={href}>
								<Link
									href={href}
									className={`hover:text-secondary transition-colors duration-300 ease-in-out lg:block hidden tracking-wide${
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
