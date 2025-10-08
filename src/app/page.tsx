"use client";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <div className="bg-[url('/images/background.jpg')] text-white h-screen overflow-y-scroll snap-y snap-proximity">
      <section
        id="home"
        className="snap-start  bg-[url('/images/beer.jpg')] bg-cover bg-center h-screen text-center flex items-center"
      >
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
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">menu de</p>
          <p className="font-subtitle text-5xl font-bold">la cantine</p>
        </div>
        <div>
        </div>
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">carte des</p>
          <p className="font-subtitle text-5xl font-bold">boissons</p>
        </div>
      </section>
      <section
        id="private"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">salle</p>
          <p className="font-subtitle text-5xl font-bold">privatisable</p>
          <div>
          </div>
        </div>
      </section>
      <section
        id="events"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">nos</p>
          <p className="font-subtitle text-5xl font-bold">événements</p>
        </div>
        <div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
