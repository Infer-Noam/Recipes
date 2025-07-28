import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Box } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";
import type { FC } from "react";

const RecipePage: FC = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe } = useGetRecipeByUuid(uuid);
  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  if (recipe && ingredients && chefs) {
    const {
      name,
      chef,
      description,
      imageUrl,
      steps,
      ingredients: recipeIngredients,
    } = recipe;
    return (
      <Box>
        <Recipe
          chefs={chefs}
          uuid={uuid}
          ingredients={ingredients}
          initialRecipe={{
            name,
            chef,
            description,
            imageUrl,
            steps,
            recipeIngredients,
          }}
        ></Recipe>
      </Box>
    );
  } else return null;
};

export default RecipePage;
