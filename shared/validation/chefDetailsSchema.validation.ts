import { EMAIL_REGEX, PHONE_REGEX } from "../consts/regex.const";
import { z } from "zod";

export const ChefDetailsSchema = z.object({
  uuid: z.union([z.string(), z.undefined()]),
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  phone: z.string().regex(PHONE_REGEX).length(10),
  email: z.string().regex(EMAIL_REGEX),
});
