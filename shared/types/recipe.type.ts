import type {
  RecipeIngredient,
  RecipeIngredientDetails,
} from "./recipeIngredient.type";
import { type Chef } from "../types/chef.type";
import type { GenericUuid } from "./generic/genericUuid.type";

export type Recipe = {
  uuid: string;
  name: string;
  steps: string[];
  chef: Chef;
  ingredients: RecipeIngredient[];
  description: string;
  imageUrl: string;
  deleteDate: Date;
  createDate: Date;
};

export type RecipeDetails = {
  uuid?: string;
  name: string;
  steps: string[];
  chef: GenericUuid;
  ingredients: RecipeIngredientDetails[];
  description: string;
  imageUrl: string;
};