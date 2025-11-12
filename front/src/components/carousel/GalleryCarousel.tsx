"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

// Définition de l'interface pour les données de la galerie venant de l'API
interface GalleryData {
    id: number; // ID de l'image (pour la clé)
    titre: string; // Titre de la galerie parente (pour l'affichage du nom)
    url: string; // URL de l'image
    alternativeText: string | null;
    formats: {
        medium?: {
            url: string;
        };
    };
}

type PropType = {
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    
    // Remplacement de 'galleryItems' par 'gallery' pour une variable d'état simple
    const [gallery, setGallery] = useState<GalleryData[]>([]);
    const [loading, setLoading] = useState(true);
    // Suppression de la constante API_URL pour utiliser l'URL directement dans fetch

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    // Chargement des données de l'API, structure de l'useEffect calquée
    useEffect(() => {
        // Nom de la fonction calqué sur le modèle (fetchEvents -> fetchGallery)
        const fetchGallery = async () => {
            try {
                const response = await fetch(
                    // Utilisation directe de l'URL dans fetch
                    "https://light-cheese-efa53451a5.strapiapp.com/api/galeries?populate=*"
                );
                const data = await response.json();
                
                if (data.data && data.data.length > 0) {
                    let allPhotos: GalleryData[] = [];
                    
                    // Logique d'aplatissement conservée pour afficher toutes les images
                    data.data.forEach((galleryItem: any) => {
                        const galleryTitre = galleryItem.titre;
                        
                        if (galleryItem.photo && galleryItem.photo.length > 0) {
                            const transformedPhotos = galleryItem.photo.map((photo: any) => ({
                                id: photo.id,
                                titre: galleryTitre, 
                                url: photo.url,
                                alternativeText: photo.alternativeText,
                                formats: photo.formats,
                            })) as GalleryData[];
                            
                            allPhotos = [...allPhotos, ...transformedPhotos];
                        }
                    });
                    
                    // setGallery(data.data) comme setEvents(data.data) pour la cohérence
                    setGallery(allPhotos);
                }
                
            } catch (error) {
                console.error("Erreur lors du chargement de la galerie:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Structure du chargement calquée
    if (loading) {
        return (
            <div className="w-full text-center py-10">
                <p className="font-body text-xl">Chargement de la galerie...</p>
            </div>
        );
    }
    
    // Si aucune image n'est trouvée (cohérence)
    if (gallery.length === 0) {
        return (
            <div className="w-full text-center py-10">
                <p className="font-body text-xl">Aucune image de galerie trouvée.</p>
            </div>
        );
    }


    return (
        <div className="w-full mt-12">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {/* Itération sur 'gallery' (comme event.map) */}
                    {gallery.map((item) => (
                        <div
                            key={item.id} 
                            className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2 flex-shrink-0"
                        >
                            <div className="relative w-full aspect-square max-w-sm mx-auto">
                                <Image
                                    alt={
                                        // Logique d'alt calquée sur l'original
                                        item.alternativeText ||
                                        `${item.titre.toLowerCase()}` 
                                    }
                                    // Utilisation du format medium s'il existe, sinon l'URL de base
                                    src={item.formats?.medium?.url || item.url} 
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className="object-cover"
                                />
                                <div className="absolute max-lg:bottom-15 bottom-25 w-full z-50 bg-transparent text-center h-10">
                                    <h3 className="font-title font-lighter max-md:text-4xl text-5xl text-shadow-lg h-full flex items-start justify-center">
                                        {item.titre.toUpperCase()}
                                    </h3>
                                </div>
                            </div>
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