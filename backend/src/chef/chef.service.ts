import { Chef } from "../chef/chef.entity";
import { AppDataSource } from "../data-source";
import { ChefDetails } from "@shared/types/chef.type";

const chefRepository = AppDataSource.getRepository(Chef);

const saveChef = async (details: ChefDetails) => {
  const { uuid, ...rest } = details;

  try {
    const chef = await AppDataSource.transaction(async (transaction) => {
      return await transaction.save(Chef, {
        ...rest,
        ...(uuid !== undefined && { uuid }),
      });
    });

    return { chef };
  } catch (err) {
    return {
      error: {
        message: err instanceof Error ? err.message : "Unknown error occurred",
      },
    };
  }
};

const getAllChefs = async () => {
  return await chefRepository.find({});
};

const deleteChef = async (uuid: string) => {
  const exist = await chefRepository.exists({
    where: { uuid },
  });
  if (!exist) return false;

  await AppDataSource.transaction(async (transaction) => {
    await transaction.softDelete(Chef, { uuid });
  });

  return true;
};

export default { saveChef, getAllChefs, deleteChef };
