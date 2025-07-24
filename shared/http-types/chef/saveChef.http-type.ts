import type { Chef, ChefDetails } from "../../types/chef.type";

export type SaveChefReq = {
  chefDetails: ChefDetails;
};

export type SaveChefRes = {
  chef?: Chef;
   error?: {
    message: string;
  };
};