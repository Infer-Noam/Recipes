import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Alert, Backdrop, Box, CircularProgress } from "@mui/material";
import { Recipe } from "../../components/recipe/recipe";
import Styles from "./recipePage.style";

const RecipePage = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe, isLoading: areRecipesLoading } =
    useGetRecipeByUuid(uuid);
  const { data: ingredients, isLoading: areIngredientsLoading } =
    useGetIngredients();
  const { data: chefs, isLoading: areChefsLoading } = useGetChefs();

  if (recipe && ingredients && chefs) {
    return (
      <Recipe recipe={recipe} chefs={chefs} ingredients={ingredients}></Recipe>
    );
  } else if (areRecipesLoading || areIngredientsLoading || areChefsLoading) {
    return (
      <Backdrop sx={Styles.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <Box sx={Styles.errorContainer}>
        <Alert sx={{ width: "90%" }} severity="error">
          Something went wrong...
        </Alert>
      </Box>
    );
  }
};

export default RecipePage;
