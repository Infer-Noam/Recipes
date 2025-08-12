import type { ChefDetailsSchema } from "@shared/validation/chefDetailsSchema.validation";
import type { ChefDetails } from "@shared/types/chef.type";
import { z } from "zod";
import type { SaveChefRes } from "@shared/api/chef/saveChef.api";
import type { AxiosResponse } from "axios";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

export type ChefTableRowProps = {
  chef: ChefDetails;
  saveChef: UseMutateAsyncFunction<
    AxiosResponse<SaveChefRes, any>,
    unknown,
    ChefDetails,
    unknown
  >;
  deleteChef: () => void;
};

export type ChefFormData = z.infer<typeof ChefDetailsSchema>;
