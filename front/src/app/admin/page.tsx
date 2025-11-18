import { auth } from "@/auth"
import PageAdmin from "@/components/sections/admin/pageAdmin";
import { redirect } from "next/navigation"

export default async function Admin() {
	 const session = await auth()

  if (!session) {
    redirect('/login')
  }
	return (
		<main className="scroll-smooth overflow-y-scroll w-screen h-screen">
			<section className="min-h-screen w-full">
				<div className="max-w-[1280px] mx-auto">
					<PageAdmin/>
				</div>
			</section>
		</main>
	);
}
