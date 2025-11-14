
export interface ApiResponse {
  allCarteItems: CarteItems[];
  count: number;
  message: string;
  ok: boolean;
}
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

export type CarteItems = {
	id: number;
	name: string;
	categorie: string;
	prix: string;
};