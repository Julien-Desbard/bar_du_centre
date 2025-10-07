// import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[url('/images/background.jpg')] text-white">
      <section className="bg-[url('/images/beer.jpg')] bg-cover bg-center h-screen text-center flex items-center">
        <div className="pl-12">
          <h1 className="font-title text-5xl pb-12 ">LE BAR DU CENTRE</h1>
          <h2 className="font-subtitle pb-12 text-2xl">En plein coeur de Angers, le <span className="text-secondary">BDC</span> pour les intîmes</h2>
          <button className="font-subtitle">Réserver une table</button>
        </div>
      </section>
      <section className="bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white">
        <p>test section 2</p>
      </section>
      <section className="bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white">
        <p> section 3</p>
      </section>
      <section className="bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white">
        <p>section 4</p>
      </section>
    </div>
  );
}
