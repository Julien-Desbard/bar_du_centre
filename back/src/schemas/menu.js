import * as z from "zod";

const NullableStringSchema = z
	.string()
	.nullable()
	.transform((val) => val ?? "");

export const createMenuItemSchema = z.object({
	cat1: z.string().min(1, { message: "cat1 est obligatoire." }),
	name: z.string().min(1, { message: "name est obligatoire." }),

	cat2: NullableStringSchema.optional(),
	slug_cat2: NullableStringSchema.optional(),
	cat3: NullableStringSchema.optional(),
	description: NullableStringSchema.optional(),
	prix_1: z.number().optional(),
	prix_2: z.number().optional(),
	prix_3: z.number().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();
