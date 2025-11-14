// src/app/page.tsx

import Events from "@/components/sections/Events";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Privatize from "@/components/sections/Privatize";

export default function Home() {
    return (
        <>
            <section className="min-h-screen snap-start w-full bg-cover bg-center bg-no-repeat"
                style={{backgroundImage : "url('/images/beer.jpg')", backgroundSize: 'cover'}}>
                <div className="max-w-[1280px] mx-auto h-full">
                    <Hero />
                </div>
            </section>

            <section className="min-h-screen snap-start w-full">
                <div className="max-w-[1280px] mx-auto">
                    <Menu />
                </div>
            </section>

            <section className="min-h-screen snap-start w-full">
                <div className="max-w-[1280px] mx-auto">
                    <Privatize />
                </div>
            </section>

            <section className="min-h-screen snap-start w-full">
                <div className="max-w-[1280px] mx-auto">
                    <Events />
                </div>
            </section>
        </>
    );
}