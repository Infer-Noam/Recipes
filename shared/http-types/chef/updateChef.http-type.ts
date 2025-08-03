import { Chef, ChefDetails } from "../../types/chef.type";

export type UpdateChefReq = {
  uuid: string;
  chefDetails: ChefDetails;
};

export type UpdateChefRes = {
  chef: Chef;
};
