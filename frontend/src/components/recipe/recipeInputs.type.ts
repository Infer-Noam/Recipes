import type { Chef as ChefModel } from "@shared/types/chef.type";
import type { DraftRecipeIngredient } from "./recipeIngredientTable/draftRecipeIngredient.type";

export type RecipeInputs = {
  name: string;
  steps: string[];
  chef: ChefModel;
  ingredients: DraftRecipeIngredient[];
  description: string;
  imageUrl: string;
};
