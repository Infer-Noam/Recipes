import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/Recipe";
import { v4 as uuidv4 } from "uuid";
import type { FC } from "react";

const RecipeCreationPage: FC = () => {
  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  const uuid = uuidv4();
  return ingredients && chefs ? (
    <Recipe
      chefs={chefs}
      ingredients={ingredients}
      uuid={uuid}
      initialRecipe={undefined}
    />
  ) : null;
};

export default RecipeCreationPage;
