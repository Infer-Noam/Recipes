import api from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { USE_GET_CHEFS_KEY } from "./useGetChefs.api";
import type {
  DeleteChefReq,
  DeleteChefRes,
} from "../../../../shared/http-types/chef/deleteChef.http-type";

export const useDeleteChef = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      const data: DeleteChefReq = { uuid };
      const response = await api.delete<DeleteChefRes>("/chef", { data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_CHEFS_KEY] });
    },
  });
};
