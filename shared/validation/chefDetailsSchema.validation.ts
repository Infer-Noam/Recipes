import { z } from "zod";

export const ChefDetailsSchema = z.object({
  uuid: z.string(),
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/)
    .length(10),
  email: z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/),
});
