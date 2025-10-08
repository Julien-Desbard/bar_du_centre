import Link from "next/link";

export default function Footer() {
  return (
    <div className="font-body  bg-transparent text-white text-base flex">
      <div className="flex">
        <ul className="flex justify-center gap-12 p-2 border-b border-b-secondary  border-secondary">
          <li></li>
          <li>
            <Link href="/#menu" className="hover:text-secondary transition">
              La cantine
            </Link>
          </li>
          <li>
            <Link href="/#events" className="hover:text-secondary transition">
              {" "}
              Evénements
            </Link>
          </li>
          <li>
            <Link href="/discovery" className="hover:text-secondary transition">
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
      </div>
      <div className="flex">
        <ul className="flex justify-center gap-12 p-2">
          <li></li>
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
              Politique de confidentialité{" "}
            </Link>
          </li>
          <li>
            <Link
              href="/legal#accessibility"
              className="hover:text-secondary transition"
            >
              Accesibilité
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
