import MenuAdmin from "@/components/sections/Admin";
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Admin() {
	 const session = await auth()

  if (!session) {
    redirect('/login')
  }
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
