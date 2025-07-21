import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { Box } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";

const RecipePage = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe } = useGetRecipeByUuid(uuid);

  if (recipe) {
    return (
      <Box>
        <Recipe
          recipe={recipe}
          chefs={[]}
          ingredients={[]}
          close={() => {}}
          save={() => {}}
          deleteRecipe={() => {}}
        ></Recipe>
      </Box>
    );
  } else return null;
};

export default RecipePage;
