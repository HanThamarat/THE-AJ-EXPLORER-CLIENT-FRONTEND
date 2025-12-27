import z from "zod";

export const fileDTOSchema = z.object({
    id:                z.string().min(0),
    base64:            z.string().min(1),
    fileName:          z.string().min(1).optional(),
    mainFile:          z.boolean(),    
});

export const fileEntitySchema = z.object({
    file_name:              z.string().min(3),
    file_original_name:     z.string().min(3),
    file_path:              z.string().min(3),
    mainFile:               z.boolean(),
    file_base64:            z.string().min(3).optional(),
    base64:                 z.string().min(3).optional(),
});


export type fileDTOSchemaType = z.infer<typeof fileDTOSchema>;
export type fileEntitySchemaType = z.infer<typeof fileEntitySchema>;