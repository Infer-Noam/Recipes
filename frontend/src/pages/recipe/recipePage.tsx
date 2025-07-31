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

  const { data: recipe, isLoading } = useGetRecipeByUuid(uuid);
  const { data: ingredients = [] } = useGetIngredients();
  const { data: chefs = [] } = useGetChefs();

  if (isLoading) {
    return (
      <Backdrop sx={Styles.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (recipe) {
    return (
      <Recipe recipe={recipe} chefs={chefs ?? []} ingredients={ingredients} />
    );
  }

  return (
    <Box sx={Styles.errorContainer}>
      <Alert sx={Styles.errorAlert} severity="error">
        Something went wrong...
      </Alert>
    </Box>
  );
};

export default RecipePage;
