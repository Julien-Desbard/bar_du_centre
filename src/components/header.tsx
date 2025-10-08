import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between font-title fixed top-0 left-0 w-full z-50 bg-transparent text-white text-2xl">
      <div className="p-6">
        <Link href="/#home">logo</Link>
      </div>
      <ul className="flex items-center gap-6 p-6">
        <li>
          <Link href="/#menu" className="hover:text-secondary transition">
            LE BDC
          </Link>
        </li>
        <li>
          <Link href="/#private" className="hover:text-secondary transition">
            PRIVATISATION
          </Link>
        </li>
        <li>
          <Link href="/#events" className="hover:text-secondary transition">
            EVENEMENTS
          </Link>
        </li>
        <li>
          <Link href="/discovery" className="hover:text-secondary transition">
            DECOUVREZ-NOUS
          </Link>
        </li>
        <li>
          <Link href="/discovery#contact" className="hover:text-secondary transition">
            CONTACT
          </Link>
        </li>
      </ul>
    </div>
  );
}
