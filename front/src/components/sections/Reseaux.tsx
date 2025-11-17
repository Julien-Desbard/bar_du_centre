import Link from "next/link";
import { Button } from "../ui/button";
import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";

export default function Reseaux() {
	const sectionTitle: SectionTitleProps = {
		part1: "nos",
		part2: "réseaux",
	};
	return (
		<section id="reseaux" 
        className="text-white overflow-hidden pt-6">
			<SectionTitle sectionTitle={sectionTitle} />
			<div className="w-full h-full flex flex-col items-center mx-auto">
				<div className="flex flex-col mt-12 gap-y-6">
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
		</section>
	);
}