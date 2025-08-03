import { Chef, ChefDetails } from "../../types/chef.type";

export type CreateChefReq = {
  chefDetails: ChefDetails
};

export type CreateChefRes = {
  chef: Chef;
};
