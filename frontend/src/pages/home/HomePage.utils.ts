import { CHEF_SRC_ARRAY } from "../chef/chefSrcArray.const";
import type { Recipe } from "../../../../shared/types/recipe.type";

export const getRandomChefSrc = () => {
  const randomIndex = Math.floor(Math.random() * CHEF_SRC_ARRAY.length);
  return CHEF_SRC_ARRAY[randomIndex];
};

export const sortRecipes = (recipes: Recipe[] | undefined) =>
  recipes?.sort(
    (a, b) =>
      new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
  );
