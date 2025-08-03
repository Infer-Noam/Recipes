import { Chef } from "../chef/chef.entity";
import { AppDataSource } from "../data-source";
import { ChefDetails } from "@shared/types/chef.type";

const chefRepository = AppDataSource.getRepository(Chef);

const createChef = async (details: ChefDetails) => {
  return await chefRepository.save({ ...details });
};

const updateChef = async (uuid: string, details: ChefDetails) => {
  return await chefRepository.save({
    uuid,
    ...details,
  });
};

const getAllChefs = async () => {
  return await chefRepository.find({});
};
export default { createChef, updateChef, getAllChefs };
