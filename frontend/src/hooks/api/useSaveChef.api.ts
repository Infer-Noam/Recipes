import api from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { SaveChefRes } from "@shared/api/chef/saveChef.api";
import { USE_GET_CHEFS_KEY } from "./useGetChefs.api";
import type { ChefDetails } from "@shared/types/chef.type";

const saveChef = async (chefDetails: ChefDetails) =>
  api.post<SaveChefRes>("/chef", { chefDetails });

export const useSaveChef = (
  onError?: (error: unknown) => void,
  onSuccess?: (data: SaveChefRes) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveChef,
    onSuccess: (response) => {
      onSuccess?.(response.data);
      queryClient.invalidateQueries({ queryKey: [USE_GET_CHEFS_KEY] });
    },
    onError,
  });
};
