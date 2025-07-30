import { RecipeCard } from "../../components/recipeCard/RecipeCard";
import { Box, Grid } from "@mui/material";
import { useGetRecipes } from "../../hooks/api/useGetRecipes.api";
import Styles from "./homePage.style";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";

const HomePage = () => {
  const { data: recipes } = useGetRecipes();

  const { mutate: deleteRecipe } = useDeleteRecipe();

  const chefSrcArray = [227920, 240413, 227924, 44252, 33158, 218334].map(
    (n) => {
      return `https://www.svgrepo.com/show/${n}/chef.svg`;
    }
  );

  const getChefSrc = () =>
    chefSrcArray[Math.floor(Math.random() * chefSrcArray.length)];

  if (recipes) {
    return (
      <Box>
        <Grid
          container
          sx={Styles.gridContainer}
          rowSpacing={2.5}
          columnSpacing={3.5}
        >
          {recipes.map((recipe) => (
            <Grid key={recipe.uuid}>
              <RecipeCard
                recipe={recipe}
                deleteRecipe={() => {
                  deleteRecipe(recipe.uuid);
                }}
                chefAvatarSrc={getChefSrc()}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else return null;
};

export default HomePage;
