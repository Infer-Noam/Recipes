import { Autocomplete, Box, TextField } from "@mui/material";
import type { FC } from "react";
import Styles from "./ingredientElement.style";
import type { RecipeFormData } from "../../../../Recipe.type";
import { Controller, useFormContext } from "react-hook-form";
import type { IngredientFormData } from "./ingredientElement.type";

type IngredientElementProps = {
  index: number;
  ingredients: IngredientFormData[];
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
      render={({ field, fieldState: { error } }) => (
        <Box sx={Styles.ingredientAutocompleteBox}>
          <Autocomplete<IngredientFormData, false, true, false>
            sx={Styles.ingredientAutocomplete}
            value={field.value}
            onChange={(_: any, newValue: IngredientFormData | null) => {
              field.onChange(newValue ?? undefined);
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
      )}
    />
  );
};

export default IngredientElement;
