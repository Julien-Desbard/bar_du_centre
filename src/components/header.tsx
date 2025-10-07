import Link from "next/link"

export default function Header() {
    return(
        <div className="flex items-center justify-between bg-transparent font-title">
            <div><Link href="/">logo</Link></div>
            <ul className="flex items-center gap-12 bg-transparent">
                <li></li>
                <li><Link href="/menu">LE BDC</Link></li>
                <li><Link href="/private">PRIVATISATION</Link></li>
                <li><Link href="/events">EVENEMENTS</Link></li>
                <li><Link href="/discovery">DECOUVREZ-NOUS</Link></li>
                <li><Link href="/contact">CONTACT</Link></li>
            </ul>
        </div>
    )
}