import { Recipe } from "./recipe.entity";
import { RecipeIngredient as RecipeIngredientEntity } from "../recipe/recipe-ingredient/recipeIngredient.entity";
import { AppDataSource } from "../data-source";
import { RecipeDetails } from "@shared/types/recipe.type";

const recipeRepository = AppDataSource.getRepository(Recipe);

const createRecipe = async (recipeDetails: RecipeDetails) => {
  const { chefUuid, ...rest } = recipeDetails;

  return await AppDataSource.transaction(async (transaction) => {
    const recipe = await transaction.save(Recipe, {
      chef: { uuid: chefUuid },
      ...rest,
    });

    return recipe;
  });
};

const updateRecipe = async (uuid: string, recipeDetails: RecipeDetails) => {
  const { chefUuid, ...rest } = recipeDetails;

  return await AppDataSource.transaction(async (transaction) => {
    const recipe = await transaction.save(Recipe, {
      uuid,
      chef: { uuid: chefUuid },
      ...rest,
    });

    return recipe;
  });
};

const deleteRecipe = async (uuid: string) => {
  const exist = await recipeRepository.exists({
    where: { uuid },
  });
  if (!exist) return false;

  await AppDataSource.transaction(async (transaction) => {
    await transaction.softDelete(RecipeIngredientEntity, { recipe: { uuid } });

    await transaction.softDelete(Recipe, { uuid });
  });

  return true;
};

const getAllRecipes = async () => {
  return await recipeRepository.find({
    relations: {
      ingredients: true,
      chef: true,
    },
  });
};

const getRecipeByUuid = async (uuid: string) => {
  return await recipeRepository.findOne({
    where: { uuid },
    relations: {
      ingredients: true,
      chef: true,
    },
  });
};

export default {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeByUuid,
};
