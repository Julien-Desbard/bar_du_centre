import * as z from "zod";

const PriceStringSchema = z
	.string()
	.regex(/^\d+(\.\d{1,2})?$/, "Doit être un nombre positif (ex: 4.50)")
	.nullable();

const NullableStringSchema = z.string().nullable();

export const createMenuItemSchema = z.object({


	cat1: z.string().min(1, { message: "cat1 est obligatoire." }), // 
	name: z.string().min(1, { message: "name est obligatoire." }), // 


	cat2: NullableStringSchema.optional(),
	cat3: NullableStringSchema.optional(),
	description: NullableStringSchema.optional(),


	price_1_boule: PriceStringSchema.optional(),
	price_2_boules: PriceStringSchema.optional(),
	prix_unique: PriceStringSchema.optional(),
	petit: PriceStringSchema.optional(),
	grand: PriceStringSchema.optional(),
	demi: PriceStringSchema.optional(),
	pinte: PriceStringSchema.optional(),
	verre: PriceStringSchema.optional(),
	bouteille: PriceStringSchema.optional(),
	cl_25: PriceStringSchema.optional(),
	cl_50: PriceStringSchema.optional(),
	l_1: PriceStringSchema.optional(),

	bio: NullableStringSchema.optional(), 
	contenance: NullableStringSchema.optional(), 
	titrage: NullableStringSchema.optional(), 
});

export const updateMenuItemSchema = createMenuItemSchema.partial()