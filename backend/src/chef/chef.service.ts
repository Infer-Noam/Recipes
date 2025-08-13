import { Recipe } from "src/recipe/recipe.entity";
import { Chef } from "../chef/chef.entity";
import { AppDataSource } from "../data-source";
import { ChefDetails } from "@shared/types/chef.type";
import { QueryFailedError } from "typeorm";
import { DuplicateError } from "src/utils/errors/duplicate.error";

const chefRepository = AppDataSource.getRepository(Chef);

const saveChef = async (details: ChefDetails) => {
  const { uuid, ...rest } = details;

  return AppDataSource.transaction(async (transaction) =>
    transaction.save(Chef, {
      ...rest,
      ...(uuid !== undefined && { uuid }),
    })
  );
};

const getAllChefs = async () => chefRepository.find({});

const deleteChef = async (uuid: string) => {
  const exist = await chefRepository.exists({
    where: { uuid },
  });
  if (!exist) return false;

  await AppDataSource.transaction(async (transaction) => {
    await transaction.softDelete(Recipe, { chef: { uuid } });
    await transaction.softDelete(Chef, { uuid });
  });

  return true;
};

export default { saveChef, getAllChefs, deleteChef };
