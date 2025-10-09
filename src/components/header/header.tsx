"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import BurgerMenu from "./burgerMenu";

// Creating Nav menu
type NavItem = { href: string; label: string };

const Nav: NavItem[] = [
  { href: "/#menu", label: "LE BDC" },
  { href: "/#private", label: "PRIVATISATION" },
  { href: "/#events", label: "EVENEMENTS" },
  { href: "/discovery", label: "DECOUVREZ-NOUS" },
  { href: "/discovery#contact", label: "CONTACT" },
];

export default function Header() {
  const [path, setPath] = useState<string>("");

  // Decteting active sections when scrolling
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPath(`/#${entry.target.id}`);
            console.log("Activation de:", `/#${entry.target.id}`);
            setPath(`/#${entry.target.id}`);
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
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav
        aria-label="navigation principale"
        className="flex items-center justify-between font-title  text-white text-2xl"
      >
        <div className="p-6">
          <Link href="/#home">logo</Link>
        </div>
        <div className="fixed top-0 right-0 z-50">
          <BurgerMenu nav={Nav} />
        </div>
        <ul className="flex items-center gap-6 p-6">
          {/* Mapping Nav to create the menu */}
          {Nav.map(({ href, label }) => {
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setPath(href)}
                  className={`hover:text-secondary transition-colors duration-300 ease-in-out lg:block hidden${
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
      </nav>
    </header>
  );
}
