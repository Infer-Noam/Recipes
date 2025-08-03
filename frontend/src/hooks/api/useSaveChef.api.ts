import api from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { SaveChefRes } from "../../../../shared/http-types/chef/saveChef.http-type";
import { USE_GET_CHEFS_KEY } from "./useGetChefs.api";
import type { ChefDetails } from "@shared/types/chef.type";

const mutationFn = async (chefDetails: ChefDetails) =>
  api.post<SaveChefRes>("/chef", { chefDetails });

export const useSaveChef = (
  onError?: (error: unknown) => void,
  onSuccess?: (data: SaveChefRes) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      onSuccess?.(response.data);
      queryClient.invalidateQueries({ queryKey: [USE_GET_CHEFS_KEY] });
    },
    onError,
  });
};
