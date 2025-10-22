import Accessibility from "@/components/accessibility/page";
import Mentions from "@/components/mentions/page";
import Privacy from "@/components/privacy/page";



export default function Home() {
	return (
		<div>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Privacy />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Mentions />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto px-4 h-full">
					<Accessibility />
				</div>
			</section>
		</div>
	);
}
