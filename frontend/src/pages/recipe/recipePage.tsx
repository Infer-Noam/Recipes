import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/recipe";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import BackdropLoading from "../../components/backdropLoading/BackdropLoading";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";
import { Box } from "@mui/material";
import type { FC } from "react";

const RecipePage: FC = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe, isLoading } = useGetRecipeByUuid(uuid);
  const { data: ingredients = [] } = useGetIngredients();
  const { data: chefs = [] } = useGetChefs();

  const { mutateAsync: saveRecipe } = useSaveRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  if (isLoading) return <BackdropLoading />;

  if (recipe) {
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
        ></Recipe>
      </Box>
    );
  }

  return <CentralErrorAlert text="Something went wrong..." />;
};

export default RecipePage;
