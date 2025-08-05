import {
  type RecipeIngredientDetails,
  type RecipeIngredient as RecipeIngredientModel,
} from "../../../../../shared/types/recipeIngredient.type";
import type { Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import type { MeasurementUnit } from "../../../../../shared/enums/measurement-unit.enum";
import { v4 as uuidv4 } from "uuid";

const useRecipeIngredient = (
  value: RecipeIngredientDetails[],
  onChange: (...event: any[]) => void,
  ingredients: IngredientModel[]
) => {
  const setRecipeIngredient = (
    updatedFields: Partial<RecipeIngredientModel>,
    uuid?: string
  ) => {
    onChange(
      value.map((recipeIngredient) =>
        recipeIngredient.uuid === uuid
          ? { ...recipeIngredient, ...updatedFields }
          : recipeIngredient
      )
    );
  };

  const addRecipeIngredient = (recipeUuid: string) => {
    onChange([...value, { uuid: uuidv4(), recipe: { uuid: recipeUuid } }]);
  };

  const removeRecipeIngredient = (recipeUuid: string) => {
    onChange(
      value.filter((recipeIngredient) => recipeIngredient.uuid !== recipeUuid)
    );
  };

  const setAmount = (amount: number, uuid?: string) => {
    if (amount >= 0 && amount <= 99) {
      setRecipeIngredient(
        {
          amount,
        },
        uuid
      );
    }
  };

  const setMeasurementUnit = (
    measurementUnit: MeasurementUnit,
    uuid?: string
  ) => {
    setRecipeIngredient(
      {
        measurementUnit,
      },
      uuid
    );
  };

  const setIngredient = (newValue: string | null, uuid?: string) => {
    if (!newValue) return;

    const ingredientIndex = ingredients.findIndex(
      (ingredient) => ingredient.name === newValue
    );

    if (ingredientIndex === -1) return;

    setRecipeIngredient(
      {
        ingredient: ingredients[ingredientIndex],
      },
      uuid
    );
  };

  return {
    addRecipeIngredient,
    removeRecipeIngredient,
    setAmount,
    setMeasurementUnit,
    setIngredient,
  };
};

export default useRecipeIngredient;
