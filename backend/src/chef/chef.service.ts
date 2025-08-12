import { Recipe } from "src/recipe/recipe.entity";
import { Chef } from "../chef/chef.entity";
import { AppDataSource } from "../data-source";
import { ChefDetails } from "@shared/types/chef.type";
import { QueryFailedError } from "typeorm";
import { HttpError } from "@shared/types/httpError.type";

const chefRepository = AppDataSource.getRepository(Chef);

const saveChef = async (details: ChefDetails) => {
  const { uuid, ...rest } = details;

  try {
    return await AppDataSource.transaction(async (transaction) =>
      transaction.save(Chef, {
        ...rest,
        ...(uuid !== undefined && { uuid }),
      })
    );
  } catch (error) {
    if (error instanceof QueryFailedError && (error as any).code === "23505") {
      const constraint = (error as any).constraint;
      if (constraint === "UQ_44862ca93599a784f9f2cf72838") {
        throw new HttpError(
          "A chef with this information already exists. Please check for duplicate values.",
          409
        );
      }
    }

    throw error;
  }
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
