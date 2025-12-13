import z from "zod";

export const authEntitySchema = (t?: any) => z.object({
    name:   z.string({
                message: t("name_err_null")
            }).min(3, {
                message: t("name_err_null")
            }).max(100).optional(),
    email:  z.email({
                message: t("email_err_null")
            }).min(3, {
                message: t("email_err_null")
            }).max(100),
    password: z.string({
                message: t("password_err_null")
            }).min(6, {
                message: t("password_err_null")
            }).max(100)
});

export type authDTOType = z.infer<ReturnType<typeof authEntitySchema>>;

export const customerEntitySchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().email(),
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    authToken: z.string().optional()
});

export type customerEntity = z.infer<typeof customerEntitySchema>;