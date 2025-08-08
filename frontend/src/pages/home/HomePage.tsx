import { RecipeCard } from "../../components/recipeCard/RecipeCard";
import { Box, Grid, Link } from "@mui/material";
import { useGetRecipes } from "../../hooks/api/useGetRecipes.api";
import Styles from "./homePage.style";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import { type FC } from "react";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";
import BackdropLoading from "../../components/backdropLoading/BackdropLoading";
import NotFoundImage from "../../assets/notFound.png";
import ImageTextDisplay from "../../components/imageTextDisplay/ImageTextDisplay";
import { getRandomChefSrc, useSortedRecipes } from "./HomePage.utils";

const HomePage: FC = () => {
  const { data: recipes, isLoading } = useGetRecipes();

  const { mutate: deleteRecipe } = useDeleteRecipe();

  const sortedRecipes = useSortedRecipes(recipes);

  if (isLoading) return <BackdropLoading />;

  if (!recipes) return <CentralErrorAlert text="Something went wrong..." />;

  if (!recipes.length)
    return (
      <ImageTextDisplay src={NotFoundImage}>
        No recipes found. Click <Link href="/creation">here</Link> to create
        one!
      </ImageTextDisplay>
    );

  return (
    <Box>
      <Grid
        container
        sx={Styles.gridContainer}
        rowSpacing={2.5}
        columnSpacing={3.5}
      >
        {sortedRecipes?.map((recipe) => (
          <Grid key={recipe.uuid}>
            <RecipeCard
              recipe={recipe}
              deleteRecipe={() => deleteRecipe(recipe.uuid)}
              chefAvatarSrc={getRandomChefSrc()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
