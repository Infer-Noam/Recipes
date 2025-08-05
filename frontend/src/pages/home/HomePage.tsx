import { RecipeCard } from "../../components/recipeCard/RecipeCard";
import { Box, Grid, Link } from "@mui/material";
import { useGetRecipes } from "../../hooks/api/useGetRecipes.api";
import Styles from "./homePage.style";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import { CHEF_SRC_ARRAY } from "../chef/chefSrcArray.const";
import type { FC, JSX } from "react";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";
import BackdropLoading from "../../components/backdropLoading/BackdropLoading";
import NotFoundImage from "../../assets/recipe_not_found.png";
import ImageTextDisplay from "../../components/imageTextDisplay/ImageTextDisplay";

const HomePage: FC = () => {
  const { data: recipes, isLoading } = useGetRecipes();

  const { mutate: deleteRecipe } = useDeleteRecipe();

  const getRandomChefSrc = () => {
    const randomIndex = Math.floor(Math.random() * CHEF_SRC_ARRAY.length);
    return CHEF_SRC_ARRAY[randomIndex];
  };

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
        {recipes
          .sort(
            (a, b) =>
              new Date(a.createDate).getTime() -
              new Date(b.createDate).getTime()
          )
          .reduce<JSX.Element[]>((acc, recipe) => {
            acc.push(
              <Grid key={recipe.uuid}>
                <RecipeCard
                  recipe={recipe}
                  deleteRecipe={() => {
                    deleteRecipe(recipe.uuid);
                  }}
                  chefAvatarSrc={getRandomChefSrc()}
                />
              </Grid>
            );
            return acc;
          }, [])}
      </Grid>
    </Box>
  );
};

export default HomePage;
