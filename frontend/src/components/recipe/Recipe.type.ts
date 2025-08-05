import type { RecipeDetails } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import type { RecipeDetailsSchema } from "../../../../shared/validation/recipeDetailsSchema.validation";
import { z } from "zod";

export type RecipeProps = {
  initialRecipe: RecipeDetails | undefined;
  chefs: ChefModel[];
  ingredients: IngredientModel[];
};

export type RecipeFormData = z.infer<typeof RecipeDetailsSchema>;
