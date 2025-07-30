import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Box } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";

const RecipePage = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe } = useGetRecipeByUuid(uuid);
  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  if (recipe && ingredients && chefs) {
    return (
      <Box>
        <Recipe
          recipe={recipe}
          chefs={chefs}
          ingredients={ingredients}
        ></Recipe>
      </Box>
    );
  } else return null;
};

export default RecipePage;
