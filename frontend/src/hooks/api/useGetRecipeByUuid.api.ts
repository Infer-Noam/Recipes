import type { GetRecipeByIdRes } from "../../../../shared/http-types/recipe/getRecipeByUuid.http-type";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

export const USE_GET_RECIPE_BY_UUID_KEY = "useGetRecipeByUuidKey";

const queryFn = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, uuid] = queryKey;
  const response = await api.get<GetRecipeByIdRes>(`/recipe/${uuid}`);
  return response.data.recipe;
};

export const useGetRecipeByUuid = (uuid: string) => {
  return useQuery({
    queryKey: [USE_GET_RECIPE_BY_UUID_KEY, uuid],
    queryFn,
  });
};
