import type { ChefDetails } from "@shared/types/chef.type";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_CHEF_DETAILS: ChefDetails = {
  uuid: uuidv4(),
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default DEFAULT_CHEF_DETAILS;
