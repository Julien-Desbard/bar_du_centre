import Link from "next/link"

export default function Footer() {
    return(
        <div className="flex items-center justify-between font-subtitle">
            <ul className="flex content-center gap-12 ">
                <li></li>
                <li><Link href="/menu">La cantine</Link></li>
                <li><Link href="/events">Evénements</Link></li>
                <li><Link href="/discovery">Découvrez-nous</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </div>
    )
}