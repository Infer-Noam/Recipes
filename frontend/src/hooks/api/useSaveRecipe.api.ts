import api from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { SaveRecipeRes } from "../../../../shared/http-types/recipe/saveRecipe.http-type";
import type { RecipeDetails } from "../../../../shared/types/recipe.type";
import { USE_GET_RECIPES_KEY } from "./useGetRecipes.api";
import { USE_GET_RECIPE_BY_UUID_KEY } from "./useGetRecipeByUuid.api";

const mutationFn = async (recipeDetails: RecipeDetails) =>
  await api.post<SaveRecipeRes>("/recipe", { recipeDetails });

export const useSaveRecipe = (
  onError?: (error: unknown) => void,
  onSuccess?: (data: SaveRecipeRes) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      onSuccess?.(response.data);
      queryClient.invalidateQueries({ queryKey: [USE_GET_RECIPES_KEY] });
      queryClient.invalidateQueries({ queryKey: [USE_GET_RECIPE_BY_UUID_KEY] });
    },
    onError,
  });
};
