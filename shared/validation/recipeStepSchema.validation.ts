import { z } from "zod";
import { UuidSchema } from "./uuidSchema.validation";

export const RecipeStepSchema = z.object({
  uuid: z.string().optional(),
  recipe: UuidSchema.optional(),
  placement: z.number(),
  text: z.string().min(1, "Each step must have content"),
});
