import { RecipeCard } from "../../components/recipeCard/RecipeCard";
import { Box, Grid } from "@mui/material";
import { useGetRecipes } from "../../hooks/api/useGetRecipes.api";
import Styles from "./homePage.style";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";

const HomePage = () => {
  const { data: recipes } = useGetRecipes();

  const { mutate: deleteRecipe } = useDeleteRecipe();

  if (recipes) {
    function getRandomChefSrc(): string {
      throw new Error("Function not implemented.");
    }

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
            .map((recipe) => (
              <Grid key={recipe.uuid}>
                <RecipeCard
                  recipe={recipe}
                  deleteRecipe={() => {
                    deleteRecipe(recipe.uuid);
                  }}
                  chefAvatarSrc={getRandomChefSrc()}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  } else return null;
};

export default HomePage;
