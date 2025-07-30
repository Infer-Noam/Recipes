import api from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type DeleteRecipeReq } from "../../../../shared/http-types/recipe/deleteRecipe.http-type";
import { USE_GET_RECIPES_KEY } from "./useGetRecipes.api";

const mutationFn = (uuid: string) => {
  const data: DeleteRecipeReq = { uuid };
  return api.delete("/recipe", { data });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_RECIPES_KEY] });
    },
  });
};
