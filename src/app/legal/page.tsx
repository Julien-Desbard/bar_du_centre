import Footer from "@/components/footer/footer";
import Privacy from "@/components/privacy/page";
import Mentions from "@/components/mentions/page";
import Accessibility from "@/components/accessibility/page";

export default function Home() {
	return (
		<div>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1200px] mx-auto px-4 h-full">
					<Privacy />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1200px] mx-auto px-4 h-full">
					<Mentions />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1200px] mx-auto px-4 h-full">
					<Accessibility />
				</div>
			</section>
		</div>
	);
}
