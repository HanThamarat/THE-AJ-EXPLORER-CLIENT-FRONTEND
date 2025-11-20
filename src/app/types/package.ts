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