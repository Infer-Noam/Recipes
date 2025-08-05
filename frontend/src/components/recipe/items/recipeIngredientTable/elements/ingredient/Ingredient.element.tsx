import { Autocomplete, Box, TextField } from "@mui/material";
import type { FC } from "react";
import Styles from "./ingredient.style";
import type { Ingredient as IngredientModel } from "@shared/types/ingredient.type";
import type { RecipeFormData } from "../../../../Recipe.type";

type IngredientElementProps = {
  ingredients: IngredientModel[];
  recipeIngredient: RecipeFormData["ingredients"][number];
  setIngredient: (newValue: string | null, uuid?: string | undefined) => void;
  error: any;
};

const IngredientElement: FC<IngredientElementProps> = ({
  ingredients,
  recipeIngredient,
  setIngredient,
  error,
}) => {
  const getIngredient = (ingredinetUuid?: string) =>
    ingredients.find((ingredient) => ingredient.uuid === ingredinetUuid);

  const ingredient = getIngredient(recipeIngredient?.ingredient?.uuid);

  return (
    <Box sx={Styles.ingredientAutocompleteBox}>
      <Autocomplete
        sx={Styles.ingredientAutocomplete}
        value={ingredient?.name ?? ""}
        onChange={(_: any, newValue: string | null) =>
          setIngredient(newValue, recipeIngredient.uuid)
        }
        options={ingredients.map((ingredient) => ingredient.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error}
            helperText={error?.message && "Ingredient is required"}
          />
        )}
      />
    </Box>
  );
};

export default IngredientElement;
