import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Box } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import type { FC } from "react";

const RecipePage: FC = () => {
  const navigate = useNavigate();

  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe } = useGetRecipeByUuid(uuid);
  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  const { mutateAsync: saveRecipe } = useSaveRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  if (recipe && ingredients && chefs) {
    const {
      name,
      chef,
      description,
      imageUrl,
      steps,
      ingredients: initialIngredients,
    } = recipe;
    return (
      <Box>
        <Recipe
          chefs={chefs}
          deleteRecipe={() => deleteRecipe(uuid)}
          saveRecipe={saveRecipe}
          uuid={uuid}
          initialName={name}
          initialChef={chef}
          initialDescription={description}
          initialImageUrl={imageUrl}
          initialSteps={steps}
          initialIngredients={initialIngredients}
          ingredients={ingredients}
          close={() => navigate(-1)}
        ></Recipe>
      </Box>
    );
  } else return null;
};

export default RecipePage;
