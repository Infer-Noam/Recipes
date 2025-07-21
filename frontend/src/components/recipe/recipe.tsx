import { type FC } from "react";
import { type Recipe as RecipeModel } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import { RecipeIngredientsTable } from "./recipeIngredientTable/RecipeIngredientsTable";

type RecipeProps = {
  recipe: RecipeModel;
  chefs: ChefModel[];
  ingredients: IngredientModel[];
  deleteRecipe: () => void;
  save: () => void;
  close: () => void;
};

export const Recipe: FC<RecipeProps> = ({ recipe, ingredients }) => {
  return (
    <RecipeIngredientsTable
      recipeIngredients={recipe.ingredients}
      ingredientsOptions={ingredients}
    />
  );
};
