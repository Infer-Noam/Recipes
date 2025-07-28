import { type GetAllIngredientsRes } from "../../../../shared/http-types/ingredient/getAllIngredients.api";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

export const USE_GET_INGREDIENTS_KEY = "getAllIngredientsKey";

const getIngredients = () =>
  api
    .get<GetAllIngredientsRes>("/ingredient")
    .then((response) => response.data.ingredients);
    
export const useGetIngredients = () => {
  return useQuery({
    queryKey: [USE_GET_INGREDIENTS_KEY],
    queryFn: getIngredients,
  });
};
