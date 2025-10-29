import * as z from "zod";

const PriceStringSchema = z
	.string()
	.regex(/^\d+(\.\d{1,2})?$/, "Doit être un nombre positif (ex: 4.50)")
	.nullable();

const NullableStringSchema = z.string().nullable();

export const createMenuItemSchema = z.object({


	cat1: z.string().min(1, { message: "cat1 est obligatoire." }), // 
	name: z.string().min(1, { message: "name est obligatoire." }), // 


	cat2: NullableStringSchema,
	cat3: NullableStringSchema,
	description: NullableStringSchema,


	price_1_boule: PriceStringSchema,
	price_2_boules: PriceStringSchema,
	prix_unique: PriceStringSchema,
	petit: PriceStringSchema,
	grand: PriceStringSchema,
	demi: PriceStringSchema,
	pinte: PriceStringSchema,
	verre: PriceStringSchema,
	bouteille: PriceStringSchema,
	cl_25: PriceStringSchema,
	cl_50: PriceStringSchema,
	l_1: PriceStringSchema,

	bio: NullableStringSchema, 
	contenance: NullableStringSchema, 
	titrage: NullableStringSchema, 
});
