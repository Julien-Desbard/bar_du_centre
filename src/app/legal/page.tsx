import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="bg-[url('/images/background.jpg')] text-white h-screen overflow-y-scroll snap-y snap-proximity">
      <section id="mentions" className="bg-[url('/images/beer.jpg')] bg-cover bg-center h-screen text-center flex items-center">
      <p>Mention légales</p>
      </section>
      <section
        id="policy"
        className="snap-start relative bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <p>politique de confidentialité</p>
      </section>
      <section
        id="accessibility"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <p>Accessibilité</p>
      </section>
      <Footer />
    </div>
  );
}
