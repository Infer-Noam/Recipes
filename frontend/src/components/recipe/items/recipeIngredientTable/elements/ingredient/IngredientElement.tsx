import { Autocomplete, Box, TextField } from "@mui/material";
import type { FC } from "react";
import Styles from "./ingredientElement.style";
import type { Ingredient as IngredientModel } from "@shared/types/ingredient.type";
import type { RecipeFormData } from "../../../../Recipe.type";
import { Controller, useFormContext } from "react-hook-form";

type IngredientElementProps = {
  index: number;
  ingredients: IngredientModel[];
};

const IngredientElement: FC<IngredientElementProps> = ({
  index,
  ingredients,
}) => {
  const { control } = useFormContext<RecipeFormData>();
  return (
    <Controller
      name={`ingredients.${index}.ingredient`}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const getIngredient = (ingredinetUuid?: string) =>
          ingredients.find((ingredient) => ingredient.uuid === ingredinetUuid);

        const ingredient = getIngredient(field.value.uuid);

        return (
          <Box sx={Styles.ingredientAutocompleteBox}>
            <Autocomplete
              sx={Styles.ingredientAutocomplete}
              value={ingredient?.name}
              onChange={(_: any, newValue: string | null) => {
                const selectedIngredient = ingredients.find(
                  (ingredient) => ingredient.name === newValue
                );
                field.onChange(
                  selectedIngredient
                    ? { uuid: selectedIngredient.uuid }
                    : undefined
                );
              }}
              disableClearable={true}
              options={ingredients.map((ingredient) => ingredient.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        );
      }}
    />
  );
};

export default IngredientElement;
