import { Autocomplete, Box, TextField } from "@mui/material";
import type { FC } from "react";
import Styles from "./ingredientElement.style";
import type { Ingredient as IngredientModel } from "../../../../../../../../shared/types/ingredient.type";
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
            <Autocomplete<IngredientModel, false, true, false>
              sx={Styles.ingredientAutocomplete}
              value={ingredient}
              onChange={(_: any, newValue: IngredientModel | null) => {
                field.onChange(newValue ? { uuid: newValue.uuid } : undefined);
              }}
              disableClearable={true}
              options={ingredients}
              getOptionLabel={(option) => option.name}
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
