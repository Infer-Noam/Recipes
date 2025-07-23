import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Box } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";

const RecipePage = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe } = useGetRecipeByUuid(uuid);
  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  const { mutateAsync: saveRecipe } = useSaveRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  if (recipe && ingredients && chefs) {
    return (
      <Box>
        <Recipe
          recipe={recipe}
          chefs={chefs}
          ingredients={ingredients}
          deleteRecipe={() => deleteRecipe(uuid)}
          saveRecipe={saveRecipe}
        ></Recipe>
      </Box>
    );
  } else return null;
};

export default RecipePage;
