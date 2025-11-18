// export interface ApiResponse {
// 	allCarteItems: CarteItems[];
// 	count: number;
// 	message: string;
// 	ok: boolean;
// }


// Elements du menu
export type MenuItem = {
	id: number;
	cat1: string;
	name: string;
	cat2?: string | null;
	cat3?: string | null;
	description?: string | null;
	intitule?: string | null;
	prix_1: string | undefined;
	prix_2: string | undefined;
	prix_3: string | undefined;
};

// eléments de la carte
export type CarteItems = {
	id: number;
	name: string;
	categorie: string;
	prix: string;
};

// Eléments des événements

export type APIStrapiResponse = {
	eventData: EventItem[]; 
};

export type EventItem = {
	id: number;
	documentId: string;
	titre: string;
	sous_titre: string | null;
	jour:string;
	date:string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	photo: Asset[]; 
};

// Contenu des images
export type AssetFormat = {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
};

// Images réduites
export type Asset = {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		small: AssetFormat;
		thumbnail: AssetFormat;

	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: unknown | null; 
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};



