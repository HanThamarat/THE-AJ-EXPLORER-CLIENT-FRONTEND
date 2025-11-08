import z from "zod";

export const ShotpackageEntitySchema = z.object({
    packageId:         z.number().min(0).max(10),
    packageName:       z.string().min(2).max(255),
});

export const findProvinceByPackageEntitySchema = z.object({
    provinceid:         z.number().min(0).max(10),
    provincename:       z.string().min(2).max(255),
    packages:           z.array(ShotpackageEntitySchema).min(0)
});

export type findProvinceByPackageEntity = z.infer<typeof findProvinceByPackageEntitySchema>;
export type ShotpackageEntity = z.infer<typeof ShotpackageEntitySchema>;