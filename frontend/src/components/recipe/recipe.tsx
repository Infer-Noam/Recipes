import { type FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type Recipe as RecipeModel } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import { RecipeIngredientsTable } from "./recipeIngredientTable/RecipeIngredientsTable";
import { type RecipeIngredient as RecipeIngredientModel } from "../../../../shared/types/recipeIngredient.type";
import type { DraftRecipeIngredient } from "./recipeIngredientTable/draftRecipeIngredient.type";

type RecipeProps = {
  recipe: RecipeModel;
  chefs: ChefModel[];
  ingredients: IngredientModel[];
  deleteRecipe: () => void;
  save: () => void;
  close: () => void;
};

export const Recipe: FC<RecipeProps> = ({ recipe, ingredients }) => {
  const [recipeIngredients, setRecipeIngredients] = useState<
    DraftRecipeIngredient[]
  >(recipe.ingredients);

  const setRecipeIngredient = (
    uuid: string,
    updatedFields: Partial<RecipeIngredientModel>
  ) => {
    setRecipeIngredients((prev) =>
      prev.map((ri) => (ri.uuid === uuid ? { ...ri, ...updatedFields } : ri))
    );
  };

  return (
    <RecipeIngredientsTable
      recipeIngredients={recipeIngredients}
      ingredientsOptions={ingredients}
      setRecipeIngredient={setRecipeIngredient}
      addRecipeIngredient={() =>
        setRecipeIngredients((prev) => [...prev, { uuid: uuidv4() }])
      }
      removeRecipeIngredient={(uuid) =>
        setRecipeIngredients((prev) => prev.filter((ri) => ri.uuid !== uuid))
      }
    />
  );
};
