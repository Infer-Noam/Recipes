import type { ChefDetails } from "../../../../../shared/types/chef.type";

export type ChefTableRowProps = {
  chef: ChefDetails;
  saveChef: (chef: ChefDetails) => void;
  deleteChef: () => void;
};
