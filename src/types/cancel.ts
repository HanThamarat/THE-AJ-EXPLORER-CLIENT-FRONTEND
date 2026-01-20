import z from "zod";

export const bankAccDTOSchema = z.object({
    bankId: z.number({ message: "Please complete all the required information." }).min(1),
    accountFirstName: z.string().min(3, { message: "Please complete all the required information." }).max(100),
    accountLastName: z.string().min(3, { message: "Please complete all the required information." }).max(100),
    accountNumber: z.string().min(5, { message: "Please complete all the required information." }).max(50)
});

export type bankAccDTOType = z.infer<typeof bankAccDTOSchema>;

export const cancelBookingDTO = z.object({
    bookingId: z.string(),
    userId: z.string().optional(),
    reason: z.string(),
    bankAccount: bankAccDTOSchema
});

export type cancelBookingDTOType = z.infer<typeof cancelBookingDTO>;

export const cancelBookingResponseSchema = z.object({
    bookingId:  z.string(),
    amount: z.number(),
    cancelStatus: z.string(),
    refundStatus: z.string().optional(),
    canceled_at: z.union([z.date(), z.string()]),
});

export type cancelBookingResponseType = z.infer<typeof cancelBookingResponseSchema>;

export const bankEntitySchema = z.object({
    id: z.number(),
    bankNameEn: z.string(),
    bankNameTh: z.string(),
    bankCode: z.string(),
    bankPicture: z.string(),
});

export type bankEntityType = z.infer<typeof bankEntitySchema>;