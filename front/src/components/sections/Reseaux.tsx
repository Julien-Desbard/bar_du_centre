import Link from "next/link";
import { Button } from "../ui/button";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

export default function Reseaux() {

        const sectionTitle: SectionTitleProps = {
            part1: "nos",
            part2: "réseaux",
        };
	return (
            <div className="w-full h-full flex flex-col items-center mx-auto">
                <SectionTitle sectionTitle={sectionTitle} />
            <div className="flex flex-col mt-12 gap-y-6 justify-self-center">
                <Link href="https://www.instagram.com/barducentre.angers/">
                    <Button className="w-[240px]">INSTAGRAM</Button>
                </Link>
                <Link href="https://www.facebook.com/barducentreangers/">
                    <Button className="w-[240px]">FACEBOOK</Button>
                </Link>
                <Link href={"/#home"}>
                    <Button className="w-[240px]">SITE WEB</Button>
                </Link>
            </div>
        </div>
	);
}
