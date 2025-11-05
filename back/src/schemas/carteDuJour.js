import * as z from "zod";

export const createCarteDuJourItem = z.object({
	name: z.string().min(3, { message: "le nom est obligatoire" }),
	categorie: z.string().min(3, { message: "la catégorie est obligatoire" }),
	prix: z.int().positive(),
});

export const updateCarteDuJourItem = createCarteDuJourItem.partial();
