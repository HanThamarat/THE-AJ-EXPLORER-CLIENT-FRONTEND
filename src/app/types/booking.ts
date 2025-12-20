import z, { email } from "zod";

export const contractBookingDTOSchema = z.object({
    firstName:  z.string().min(3).max(100),
    lastName:  z.string().min(3).max(100),
    email:  z.string().email(),
    phoneNumber: z.string().min(10).max(10),
    country: z.string().min(2).max(2),
    arrival_details: z.string().min(3).max(1000),
    additionalDetail: z.string().optional()
});

export type contractBookingDTO = z.infer<typeof contractBookingDTOSchema>;