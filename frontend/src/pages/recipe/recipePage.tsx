import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { useGetIngredients } from "../../hooks/api/useGetIngredients.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { Recipe } from "../../components/recipe/recipe";
import BackdropLoading from "src/components/backdropLoading/BackdropLoading";
import CentralErrorAlert from "src/components/centralErrorAlert/CentralErrorAlert";

const RecipePage = () => {
  const { uuid } = useParams();

  if (!uuid) return null;

  const { data: recipe, isLoading } = useGetRecipeByUuid(uuid);
  const { data: ingredients = [] } = useGetIngredients();
  const { data: chefs = [] } = useGetChefs();

  if (isLoading) return <BackdropLoading />;

  if (recipe) {
    return (
      <Recipe recipe={recipe} chefs={chefs ?? []} ingredients={ingredients} />
    );
  }

  return <CentralErrorAlert text="Something went wrong..." />;
};

export default RecipePage;
