import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Box } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const RecipeCreationPage = () => {
  const navigate = useNavigate();

  const { data: ingredients } = useGetIngredients();
  const { data: chefs } = useGetChefs();

  const { mutateAsync: saveRecipe } = useSaveRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const uuid = uuidv4();
  if (ingredients && chefs) {
    return (
      <Box>
        <Recipe
          chefs={chefs}
          ingredients={ingredients}
          deleteRecipe={() => deleteRecipe(uuid)}
          saveRecipe={saveRecipe}
          uuid={uuid}
          initialName={""}
          initialChef={undefined}
          initialDescription={""}
          initialImageUrl={""}
          initialSteps={[]}
          initialIngredients={[]}
          close={() => navigate("/")}
        ></Recipe>
      </Box>
    );
  } else return null;
};

export default RecipeCreationPage;
