import { type Recipe } from "./recipe.type";
import type { GenericUuid } from "./generic/genericUuid.type";

export type RecipeStep = {
  uuid: string;
  recipe: Recipe;
  placement: number;
  text: string;
  createDate: Date;
  deleteDate: Date;
};

export type RecipeStepDetails = {
  uuid?: string;
  recipe?: GenericUuid;
  placement: number;
  text: string;
};
