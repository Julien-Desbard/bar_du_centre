import Footer from "@/components/footer/footer";
import Gallery from "@/components/gallery/gallery";
import Bdc_history from "@/components/bdc_history/bdc_history";
import Staff from "@/components/staff/staff";
import Suppliers from "@/components/suppliers/suppliers";
import Contact from "@/components/contact/contact";

export default function Home() {
	return (
		<main className="scroll-smooth overflow-y-scroll snap-y snap-proximity bg-[url('/images/background.jpg')] text-white h-screen">
			<Gallery />
			<Staff />
			<Bdc_history />
			<Suppliers />
			<Contact />
			<Footer />
		</main>
	);
}
