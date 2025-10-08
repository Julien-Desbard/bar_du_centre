import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-[url('/images/background.jpg')] text-white h-screen overflow-y-scroll snap-y snap-proximity">
      <section className="bg-[url('/images/beer.jpg')] bg-cover bg-center h-screen text-center flex items-center">
        <div className="px-24">
          <h1 className="font-title text-5xl pb-12 ">LE BAR DU CENTRE</h1>
          <h2 className="font-subtitle pb-14 text-2xl">
            En plein coeur d&apos;Angers, le{" "}
            <span className="text-secondary">BDC</span> pour les intîmes
          </h2>
          <Button>Réserver une table</Button>
        </div>
      </section>
      <section
        id="menu"
        className="snap-start relative bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <p>test section 2</p>
      </section>
      <section
        id="private"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <p> section 3</p>
      </section>
      <section
        id="events"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <p>section 4</p>
      </section>
      <Footer />
    </div>
  );
}
