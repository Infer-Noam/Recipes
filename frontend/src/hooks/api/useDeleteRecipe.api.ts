import api from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type DeleteRecipeReq } from "../../../../shared/http-types/recipe/deleteRecipe.http-type";
import { USE_GET_RECIPES_KEY } from "./useGetRecipes.api";
import type { DeleteChefRes } from "@shared/http-types/chef/deleteChef.http-type";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      const data: DeleteRecipeReq = { uuid };
      const response = await api.delete<DeleteChefRes>("/recipe", { data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_RECIPES_KEY] });
    },
  });
};
