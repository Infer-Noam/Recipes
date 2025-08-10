import { MeasurementUnit } from "../enums/measurement-unit.enum";
import { type Ingredient } from "../types/ingredient.type";
import { type Recipe } from "../types/recipe.type";
import type { GenericUuid } from "./generic/genericUuid.type";

export type RecipeIngredient = {
  uuid: string;
  recipe: Recipe;
  ingredient: Ingredient;
  amount: number;
  measurementUnit: MeasurementUnit;
  createDate: Date;
  deleteDate: Date;
};

export type RecipeIngredientDetails = {
  uuid?: string;
  recipe: GenericUuid;
  ingredient: GenericUuid;
  amount: number;
  measurementUnit: MeasurementUnit;
};
