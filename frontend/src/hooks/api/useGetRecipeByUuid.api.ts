import type { GetRecipeByIdRes } from "../../../../shared/api/recipe/getRecipeByUuid.http-type";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

export const USE_GET_RECIPE_BY_UUID_KEY = "useGetRecipeByUuidKey";

const getRecipeByUuid = async (uuid: string) => {
  const response = await api.get<GetRecipeByIdRes>(`/recipe/${uuid}`);
  return response.data.recipe;
};

export const useGetRecipeByUuid = (uuid: string | undefined) => {
  return useQuery({
    queryKey: [USE_GET_RECIPE_BY_UUID_KEY, uuid],
    queryFn: () => getRecipeByUuid(uuid!),
    enabled: Boolean(uuid),
  });
};
