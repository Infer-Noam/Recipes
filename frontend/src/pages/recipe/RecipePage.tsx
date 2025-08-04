import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/recipe";
import BackdropLoading from "../../components/backdropLoading/BackdropLoading";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";

const RecipePage = () => {
  const { uuid } = useParams();

  if (!uuid) return <CentralErrorAlert text="Recipe identifier missing" />;

  const { data: recipe, isLoading } = useGetRecipeByUuid(uuid);
  const { data: ingredients = [] } = useGetIngredients();
  const { data: chefs = [] } = useGetChefs();

  if (isLoading) return <BackdropLoading />;

  if (!recipe) {
    return <CentralErrorAlert text="Something went wrong..." />;
  }

  return (
    <Recipe
      uuid={uuid}
      initialRecipe={recipe}
      chefs={chefs}
      ingredients={ingredients}
    />
  );
};

export default RecipePage;
