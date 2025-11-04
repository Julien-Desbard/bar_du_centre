import * as z from "zod";

const NullableStringSchema = z
	.string()
	.nullable()
	.transform((val) => val ?? "");

export const createMenuItemSchema = z.object({
	cat1: z.string().min(1, { message: "cat1 est obligatoire." }),
	name: z.string().min(1, { message: "name est obligatoire." }),

	cat2: z.string().min(1,{message : "cat2 est obligatoire"}),
	slug_cat2: z.string().min(1),
	cat3: NullableStringSchema.optional(),
	description: NullableStringSchema.optional(),
	prix_1: z.number().positive(),
	prix_2: z.number().positive().optional(),
	prix_3: z.number().positive().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();
