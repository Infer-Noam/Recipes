import { type FC, useState } from "react";
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
};

export const Recipe: FC<RecipeProps> = ({
  recipe,
  chefs,
  ingredients,
  deleteRecipe,
  save,
}) => {
  const [name, setName] = useState(recipe.name);
  const [chefUuid, setChefUuid] = useState(recipe.chef.uuid);

  const chefOptions = chefs.map((c) => c.email);

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

  function uuidv4(): string {
    throw new Error("Function not implemented.");
  }

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
