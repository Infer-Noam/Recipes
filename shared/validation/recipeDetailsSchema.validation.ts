import { z } from "zod";
import { MeasurementUnit } from "../enums/measurement-unit.enum";
import { IMAGE_URL_REGEX } from "../consts/regex.const";

export const RecipeDetailsSchema = z.object({
  uuid: z.string().optional(),
  name: z
    .string()
    .min(1, "Recipe name is required")
    .max(20, "Recipe name must be at most 20 characters"),
  steps: z
    .array(z.string().min(1, "Each step must have content"))
    .min(1, "At least one step is required")
    .max(20, "You can add up to 20 steps only"),
  chef: z.object(
    {
      uuid: z.string(),
    },
    "Chef is required"
  ),
  ingredients: z
    .array(
      z.object({
        uuid: z.string().optional(),

        recipe: z.union([
          z.object({
            uuid: z.string(),
          }),
          z.undefined(),
        ]),

        ingredient: z.object(
          {
            uuid: z.string(),
          },
          "Ingredient is required"
        ),

        amount: z.number().min(1, "Amount must be at least 1"),

        measurementUnit: z.enum(
          MeasurementUnit,
          "Measurement unit is required"
        ),
      })
    )
    .min(1, "At least one ingredient is required")
    .max(50, "You can add up to 50 ingredients only"),

  description: z.string().min(1, "Description is required"),

  imageUrl: z.string().regex(IMAGE_URL_REGEX, "Image URL must be valid"),
});
