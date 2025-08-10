import { EMAIL_REGEX, PHONE_REGEX } from "../consts/regex.const";
import { z } from "zod";

export const ChefDetailsSchema = z.object(
  {
    uuid: z.uuid().optional(),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(20, "First name must be at most 20 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(20, "Last name must be at most 20 characters"),
    phone: z
      .string()
      .regex(PHONE_REGEX, "Phone number must be valid")
      .length(10, "Phone number must be 10 digits"),
    email: z.string().regex(EMAIL_REGEX, "Email must be valid"),
  },
  "Chef is required"
);
