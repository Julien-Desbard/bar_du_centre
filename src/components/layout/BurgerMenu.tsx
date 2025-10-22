
import { MenuIcon } from "../ui/MenuIcon";
import Link from "next/link";


import { useEffect, useState } from "react";
import { XIcon } from "../ui/XIcon";

type NavItem = { href: string; label: string };

type Props = { nav: NavItem[] };

export default function BurgerMenu({ nav }: Props) {
	const [path, setPath] = useState<string>("");
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (open) {
			const timeout = setTimeout(() => setVisible(true), 100); // wait animation end
			return () => clearTimeout(timeout);
		} else {
			const timeout = setTimeout(() => setVisible(false), 100); // wait animation end
			return () => clearTimeout(timeout);
		}
	}, [open]);

	return (
		<div>
			<div className="p-6 lg:hidden">
				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Ouvrir le menu"
				>
					<MenuIcon className="h-8 w-8 hover:text-secondary transition-colors duration-300 ease-in-out" />
				</button>
			</div>
			{visible && (
				<div
					className={`fixed top-0 right-0 z-50 bg-black/80 p-6 flex flex-col max-sm:w-screen max-lg:h-screen lg:hidden backdrop-blur
                    `}
				>
					<div className="flex justify-end">
						<button type="button" aria-label="Fermer le menu" className=" hover:text-secondary transition-colors duration-300 ease-in-out">
							<XIcon
							
								onClick={() => setOpen(false)}
								className="w-6 h-6"
							/>
						</button>
					</div>
					<div>
						<ul className="flex flex-col gap-6 pl-0.5 pt-6 pr-6">
							{nav.map(({ href, label }) => {
								return (
									<li key={href}>
										<Link
											href={href}
											onClick={() => {
												setOpen(false);
												setPath(href);
											}}
											className={`hover:text-secondary transition-colors duration-300 ease-in-out${
												path === href
													? "underline underline-offset-8 decoration-secondary "
													: ""
											}`}
											aria-current={path === href ? "page" : undefined}
										>
											{label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
