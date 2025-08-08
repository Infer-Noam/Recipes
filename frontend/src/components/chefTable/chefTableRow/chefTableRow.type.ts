import type { ChefDetailsSchema } from "../../../../../shared/validation/chefDetailsSchema.validation";
import type { ChefDetails } from "../../../../../shared/types/chef.type";
import { z } from "zod";
import type { SaveChefRes } from "../../../../../shared/api/chef/saveChef.api";
import type { AxiosResponse } from "axios";

export type ChefTableRowProps = {
  chef: ChefDetails;
  saveChef: (
    chefDetails: ChefDetails
  ) => Promise<AxiosResponse<SaveChefRes, any>>;
  deleteChef: () => void;
};

export type ChefFormData = z.infer<typeof ChefDetailsSchema>;
