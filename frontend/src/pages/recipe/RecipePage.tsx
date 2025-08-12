import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/Recipe";
import BackdropLoading from "../../components/backdropLoading/BackdropLoading";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";

const RecipePage = () => {
  const { uuid } = useParams();

  const { data: recipe, isLoading } = useGetRecipeByUuid(uuid);
  const { data: ingredients = [] } = useGetIngredients();
  const { data: chefs = [] } = useGetChefs();

  if (isLoading) return <BackdropLoading />;

  if (!uuid) return <CentralErrorAlert text="Recipe identifier missing" />;

  if (!recipe) {
    return <CentralErrorAlert text="Something went wrong..." />;
  }

  return (
    <Recipe
      initialRecipe={recipe}
      chefs={chefs}
      ingredients={ingredients}
    />
  );
};

export default RecipePage;
