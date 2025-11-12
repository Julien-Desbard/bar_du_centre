import Accessibility from "@/components/sections/Accessibility";
import Mentions from "@/components/sections/Mentions";
import Privacy from "@/components/sections/Privacy";



export default function Home() {
	return (
		<div>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Privacy />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Mentions />
				</div>
			</section>
			<section className="h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto h-full">
					<Accessibility />
				</div>
			</section>
		</div>
	);
}
