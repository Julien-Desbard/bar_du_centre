import { Menu, X } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

type NavItem = { href: string; label: string };

type Props = { nav: NavItem[] };

export default function BurgerMenu({ nav }: Props) {
  const [path, setPath] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {};
  return (
    <div className="bg-black p-6 flex flex-col max-sm:w-screen max-lg:h-screen lg:hidden">
      <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-8 w-8 hover:text-secondary transition-colors duration-300 ease-in-out " />
          </button> 
          <button type="button" aria-label="Fermer le menu">
            <X className="w-6 h-6" />
          </button>
      </div>
      <div>
        <ul className="flex flex-col gap-6 pl-0.5 pt-6 pr-6">
          {nav.map(({ href, label }) => {
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setPath(href)}
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
  );
}
