import z from "zod";

export const couponEntitySchema = z.object({
    id: z.number(),
    type: z.string(),
    couponName: z.string().optional(),
    maxPercentDiscount: z.number().optional(),
    minimumPercentDiscount: z.number().optional(),
    description: z.string().nullable(),
});

export type couponEntityType = z.infer<typeof couponEntitySchema>;

export const couponsResponseSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPage: z.number(),
    nextPage: z.number(),
    prevPage: z.number(),
    items: z.array(couponEntitySchema).min(0)
});

export type couponsResponseType = z.infer<typeof couponsResponseSchema>;