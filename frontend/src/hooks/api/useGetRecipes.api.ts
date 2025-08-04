import { type GetAllRecipesRes } from "../../../../shared/api/recipe/getAllRecipes.http-type";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

export const USE_GET_RECIPES_KEY = "useGetRecipesKey";

const getRecipes = () =>
  api
    .get<GetAllRecipesRes>("/recipe")
    .then((response) => response.data.recipes);

export const useGetRecipes = () => {
  return useQuery({
    queryKey: [USE_GET_RECIPES_KEY],
    queryFn: getRecipes,
  });
};
