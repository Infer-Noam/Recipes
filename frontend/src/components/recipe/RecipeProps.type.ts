import type { RecipeDetails } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";

export type RecipeProps = {
  uuid: string;
  initialRecipe: RecipeDetails | undefined;
  chefs: ChefModel[];
  ingredients: IngredientModel[];
};
