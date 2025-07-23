import { MeasurementUnit } from "../enums/measurement-unit.enum";
import { type Ingredient } from "../types/ingredient.type";
import { type Recipe } from "../types/recipe.type";

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
  recipe: { uuid: string };
  ingredient: { uuid: string };
  amount: number;
  measurementUnit: MeasurementUnit;
};
