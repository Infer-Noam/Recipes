import type { ChefDetailsSchema } from "../../../../../shared/validation/chefDetailsSchema.validation";
import type { ChefDetails } from "../../../../../shared/types/chef.type";
import { z } from "zod";

export type ChefTableRowProps = {
  chef: ChefDetails;
  saveChef: (chef: ChefDetails) => void;
  deleteChef: () => void;
};

export type ChefFormData = z.infer<typeof ChefDetailsSchema>;
