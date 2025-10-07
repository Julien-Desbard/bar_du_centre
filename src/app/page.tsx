// import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[url('/images/background.jpg')] text-white">
      <section className="bg-[url('/images/beer.jpg')] bg-cover bg-center h-screen ">
        <h1 className="font-title text-5xl">LE BAR DU CENTRE</h1>
        <h2 className="font-subtitle">En plein coeur de Angers, le BDC pour les intîmes</h2>
        <button>Réserver une table</button>
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
