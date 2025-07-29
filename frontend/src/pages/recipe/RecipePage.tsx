import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/Recipe";
import type { FC } from "react";

const RecipePage: FC = () => {
  const { uuid } = useParams();

  const { data: recipe } = useGetRecipeByUuid(uuid);
  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  if (!uuid) return null;

  return recipe && ingredients && chefs ? (
    <Recipe
      chefs={chefs}
      uuid={uuid}
      ingredients={ingredients}
      initialRecipe={recipe}
    ></Recipe>
  ) : null;
};

export default RecipePage;
