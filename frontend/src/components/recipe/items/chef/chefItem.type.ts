import { z } from "zod"
import { ChefDetailsSchema } from "@shared/validation/chefDetailsSchema.validation"

export type ChefFormData = z.infer<typeof ChefDetailsSchema>