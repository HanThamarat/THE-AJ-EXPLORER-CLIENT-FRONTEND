import z from "zod";
import { fileEntitySchemaType } from "./files";

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

export interface packageClientResponse {
    page:               number;
    limit:              number;
    total:              number;
    totalPage:          number;
    nextPage:           number | null;
    prevPage:           number | null;
    items:              packageListEntity[] | [];
}

export interface packageListEntity {
    packageId:          number;
    packageName:        string;
    packageDes:         string;
    province:           string;
    fromAmount:         number;
    promoAmount?:       number;
    starAvg:            number;
    reviewQty:          number;
    packageImage:       fileEntitySchemaType[] | [];
}

export const packageImageSaveSchema = z.object({
    file_name: z.string(),
    file_original_name: z.string(),
    file_path: z.string(),
    mainFile: z.boolean(),
    file_base64: z.string().nullable().optional(),
});

export type packageImageSave = z.infer<typeof packageImageSaveSchema>;

export const packageIncludeSchema = z.object({
    detail: z.string(),
});

export type packageInclude = z.infer<typeof packageIncludeSchema>;

export const packageNotIncludeSchema = z.object({
    detail: z.string(),
});

export type packageNotInclude = z.infer<typeof packageNotIncludeSchema>;

export const packageOptionEntitySchema = z.object({
    id: z.number().int(),
    packageId: z.number().int(),
    pkgOptionTypeId: z.number().int().optional(),
    pkgOptionType: z.string(),
    name: z.string(),
    description: z.string(),
    adultFromAge: z.string().optional(),
    adultToAge: z.string().optional(),
    childFromAge: z.string().optional(),
    childToAge: z.string().optional(),
    groupFromAge: z.string().optional(),
    groupToAge: z.string().optional(),
    adultPrice: z.number().optional(),
    adultPromoPrice: z.number().optional(),
    childPrice: z.number().optional(),
    childPromoPrice: z.number().optional(),
    groupPrice: z.number().optional(),
    groupPromoPrice: z.number().optional(),
    created_at: z.union([z.date(), z.string()]).optional(),
    updated_at: z.union([z.date(), z.string()]).optional(),
});

export type packageOptionEntity = z.infer<typeof packageOptionEntitySchema>;

export const packageAttractionEntitySchema = z.object({
    attractionName: z.string(),
    attractionTime: z.union([z.date(), z.string()]),
    description: z.string().optional(),
    status: z.boolean(),
});

export type packageAttractionEntity = z.infer<typeof packageAttractionEntitySchema>;

export const packageEntitySchema = z.object({
    id: z.number().int(),
    packageName: z.string(),
    packageTypeId: z.number().int().optional(),
    packageType: z.string(),
    description: z.string().optional(),
    additional_description: z.string().optional(),
    province: z.string(),
    provinceId: z.number().int().optional(),
    district: z.string(),
    districtId: z.number().int().optional(),
    subDistrict: z.string(),
    subDistrictId: z.number().int().optional(),
    packageImage: z.array(packageImageSaveSchema),
    depart_point_lon: z.string(),
    depart_point_lat: z.string(),
    end_point_lon: z.string(),
    end_point_lat: z.string(),
    benefit_include: z.array(packageIncludeSchema).nullable(),
    benefit_not_include: z.array(packageNotIncludeSchema).nullable(),
    packageOption: z.array(packageOptionEntitySchema).nullable(),
    pakcageAttraction: z.array(packageAttractionEntitySchema).nullable(),
    status: z.union([z.boolean(), z.string()]),
    created_by: z.string(),
    updated_by: z.string(),
    created_at: z.union([z.date(), z.string()]),
    updated_at: z.union([z.date(), z.string()]),
});

export type packageEntity = z.infer<typeof packageEntitySchema>;