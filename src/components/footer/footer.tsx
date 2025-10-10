import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="font-body bg-transparent text-white text-base grid grid-cols-[auto_1fr_auto] items-center px-4">
      {/* Logo à gauche */}
      <Link href="/#home">
        <Image
          src="/images/logo_bdc.webp"
          alt="logo du Bar du Centre"
          width={80}
          height={80}
        />
      </Link>

      {/* Contenu centré au milieu */}
      <div className="grid grid-rows-2 justify-self-center">
        <ul className="grid grid-cols-4 justify-items-center gap-12 p-2 border-b border-b-secondary border-secondary">
          <li>
            <Link href="/#menu" className="hover:text-secondary transition">
              La cantine
            </Link>
          </li>
          <li>
            <Link href="/#events" className="hover:text-secondary transition">
              Evénements
            </Link>
          </li>
          <li>
            <Link
              href="/discovery#gallery"
              className="hover:text-secondary transition"
            >
              Découvrez-nous
            </Link>
          </li>
          <li>
            <Link
              href="/discovery#contact"
              className="hover:text-secondary transition"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul className="grid grid-cols-3 justify-items-center gap-12 p-2">
          <li>
            <Link
              href="/legal#mentions"
              className="hover:text-secondary transition"
            >
              Mentions légales
            </Link>
          </li>
          <li>
            <Link
              href="/legal#policy"
              className="hover:text-secondary transition"
            >
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link
              href="/legal#accessibility"
              className="hover:text-secondary transition"
            >
              Accessibilité
            </Link>
          </li>
        </ul>
      </div>

      {/* Espace vide symétrique à droite */}
      <div className="w-20"></div>
    </div>
  );
}