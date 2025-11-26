import z from "zod";

export const SearchSchema = z.object({
    provinceId:     z.number(),
    packageName:    z.string().min(3).max(50).optional()
});

export type SearchType = z.infer<typeof SearchSchema>;