import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/Recipe";
import type { FC } from "react";

const RecipeCreationPage: FC = () => {
  const { data: ingredients = [] } = useGetIngredients();
  const { data: chefs = [] } = useGetChefs();

  return (
    <Recipe chefs={chefs} ingredients={ingredients} initialRecipe={undefined} />
  );
};

export default RecipeCreationPage;
