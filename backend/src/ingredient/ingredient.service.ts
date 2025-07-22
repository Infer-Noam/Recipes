import { Ingredient } from "../ingredient/ingredient.entity";
import { AppDataSource } from "../data-source";

const ingredientRepository = AppDataSource.getRepository(Ingredient);

const createIngredient = async (name: string) => {
  return await ingredientRepository.save({ name });
};

const getAllIngredients = async () => {
  return await ingredientRepository.find();
};

export default { createIngredient, getAllIngredients };
