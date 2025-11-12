"use client"
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
    options?: EmblaOptionsType;
    // La prop 'staffContent' est retirée, comme dans l'exemple de 'eventCarousel'.
};

// Interface StaffData, calquée sur EventData mais ajustée pour le staff
interface StaffData {
    id: number;
    documentId: string;
    titre: string; // Utilisé comme 'name'
    sous_titre: string | null;

    // Les champs 'jour' et 'date' de EventData n'existent pas ici, on les omet.
    
    photo: Array<{
        id: number;
        url: string;
        alternativeText: string | null;
        formats: {
            medium?: { // On préfère 'medium' si c'est la taille préférée dans eventCarousel, sinon on utilise 'small' si elle est plus pertinente pour le staff. Je garde 'small' car l'exemple API du staff la fournissait.
                url: string;
            };
            small?: { 
                url: string;
            };
        };
    }>;
}

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    // Nom de la variable d'état calqué sur le modèle (events -> staff)
    const [staff, setStaff] = useState<StaffData[]>([]); 
    const [loading, setLoading] = useState(true);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    // Chargement des données de l'API, structure interne calquée
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                // Utilisation directe de l'URL dans fetch, sans variable API_URL
                const response = await fetch(
                    "https://light-cheese-efa53451a5.strapiapp.com/api/equipes?populate=*"
                );
                const data = await response.json();
                
                // setStaff(data.data) comme setEvents(data.data)
                setStaff(data.data);
            } catch (error) {
                console.error("Erreur lors du chargement du staff:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    // Affichage loading calqué
    if (loading) {
        return (
            <div className="w-full text-center py-10">
                <p className="font-body text-xl">Chargement du staff...</p>
            </div>
        );
    }
    
    // Ajout d'une condition si le tableau est vide pour être complet
    if (staff.length === 0) {
        return (
            <div className="w-full text-center py-10">
                <p className="font-body text-xl">Aucun membre du staff trouvé.</p>
            </div>
        );
    }


    return (
        <div className="w-full mt-12">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {/* Itération sur 'staff' (comme event.map) */}
                    {staff.map((item) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2 flex-shrink-0"
                        >
                            <div className="relative w-full aspect-square max-w-sm mx-auto">
                                <Image
                                    alt={
                                        // Logique d'alt calquée sur l'original
                                        item.photo[0]?.alternativeText ||
                                        `${item.titre.toLowerCase()} ${item.sous_titre ? item.sous_titre.toLowerCase() : ''}`
                                    }
                                    // Utilisation du format 'medium' si possible, sinon 'small' ou url de base pour rester générique comme dans eventCarousel
                                    src={
                                        item.photo[0]?.formats?.medium?.url || 
                                        item.photo[0]?.formats?.small?.url || 
                                        item.photo[0]?.url
                                    }
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className="object-cover"
                                />
                                <div className="absolute max-lg:bottom-15 bottom-25 w-full z-50 bg-transparent text-center h-10">
                                    <h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg">
                                        {/* Utilisation de 'titre' comme nom principal */}
                                        {item.titre.toUpperCase()}
                                    </h3>
                                    {/* Ajout du sous-titre pour reproduire la structure d'affichage de l'événement */}
                                    {item.sous_titre && (
                                        <p className="font-title max-md:text-2xl text-3xl text-shadow-lg">
                                            {item.sous_titre}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* Les événements affichaient la date/jour ici. Le staff n'en a pas, je retire donc ce bloc. */}
                            {/*
                            <p className="font-body text-center text-xl mt-2">
                                {item.jour} {item.date}
                            </p>
                            */}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center mt-6 px-4">
                <div className="flex gap-2">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;