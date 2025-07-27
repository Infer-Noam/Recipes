import { Recipe } from "../../components/recipe/recipe";
import { Box, Grid } from "@mui/material";
import { useGetRecipes } from "../../hooks/api/useGetRecipes.api";
import api from "../../api";
import { type DeleteRecipeReq } from "../../../../shared/http-types/recipe/deleteRecipe.http-type";
import { useQueryClient } from "@tanstack/react-query";
import Styles from "./homePage.style";
import { USE_GET_RECIPES_KEY } from "../../hooks/api/useGetRecipes.api";
import { chefSrcArray } from "../../consts/chefSrcArray.const";
import type { FC } from "react";

const HomePage: FC = () => {
  const { data: recipes } = useGetRecipes();

  const queryClient = useQueryClient();

  const deleteRecipe = async (uuid: string) => {
    await api.delete<DeleteRecipeReq>("/recipe", { data: { uuid } });
    queryClient.invalidateQueries({ queryKey: [USE_GET_RECIPES_KEY] });
  };

  const getRandomChefSrc = () =>
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
              <Recipe
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
