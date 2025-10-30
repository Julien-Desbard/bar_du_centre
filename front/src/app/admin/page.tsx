import MenuAdmin from "@/components/sections/admin";

export default function Admin() {
	return (
		<main className="scroll-smooth overflow-y-scroll snap-y snap-proximity w-screen h-screen">
			<section className="min-h-screen snap-start w-full">
				<div className="max-w-[1280px] mx-auto">
					<MenuAdmin />
				</div>
			</section>
		</main>
	);
}
