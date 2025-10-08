import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-[url('/images/background.jpg')] text-white h-screen overflow-y-scroll snap-y snap-proximity">
      <section id="gallery" className="text-center flex items-center">
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">notre</p>
          <p className="font-subtitle text-5xl font-bold">brasserie</p>
        </div>
      </section>
      <section
        id="staff"
        className="snap-start relative bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
         <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">notre</p>
          <p className="font-subtitle text-5xl font-bold">équipe</p>
        </div>
      </section>
      <section
        id="history"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">notre</p>
          <p className="font-subtitle text-5xl font-bold">histoire</p>
        </div>
      </section>
      <section
        id="suppliers"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">nos</p>
          <p className="font-subtitle text-5xl font-bold">fournisseurs</p>
        </div>
      </section>
            <section
        id="contact"
        className="snap-start bg-[url('/images/background.jpg')] bg-cover bg-center h-screen text-white"
      >
        <div className="pt-24 pl-24">
          <p className="font-subtitle text-5xl text-h2 font-bold">nous</p>
          <p className="font-subtitle text-5xl font-bold">trouver</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
