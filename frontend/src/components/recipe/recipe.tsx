import { type FC, useState } from "react";
import { type Recipe as RecipeModel } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import { RecipeIngredientsTable } from "./recipeIngredientTable/RecipeIngredientsTable";
import type { DraftRecipeIngredient } from "./recipeIngredientTable/draftRecipeIngredient.type";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Styles from "./recipe.style";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecipeStepsList from "./recipeSteps/RecipeStepsList";

type RecipeProps = {
  recipe: RecipeModel;
  chefs: ChefModel[];
  ingredients: IngredientModel[];
  deleteRecipe: () => void;
  save: () => void;
};

export const Recipe: FC<RecipeProps> = ({
  recipe,
  chefs,
  ingredients,
  deleteRecipe,
  save,
}) => {
  const [name, setName] = useState(recipe.name);
  const [chef, setChef] = useState(recipe.chef);
  const [description, setDescription] = useState(recipe.description);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
  const [steps, setSteps] = useState(recipe.steps);
  const [recipeIngredients, setRecipeIngredients] = useState<
    DraftRecipeIngredient[]
  >(recipe.ingredients);

  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Recipe name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        multiline
        id="outlined-basic"
        label="Short description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Autocomplete
        sx={Styles.chefAutocomplete}
        options={chefs}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        value={chefs.find((c) => c.uuid === chef.uuid) || null}
        onChange={(_, newValue: ChefModel | null) => {
          if (newValue) {
            setChef(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Chef" />}
        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
      />

      <TextField
        id="outlined-basic"
        label="Image url"
        variant="outlined"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={"Open image"}
                  onClick={() => window.open(imageUrl)}
                  edge="end"
                >
                  <OpenInNewIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <RecipeStepsList steps={steps} setSteps={setSteps} />

      <RecipeIngredientsTable
        recipeIngredients={recipeIngredients}
        ingredientsOptions={ingredients}
        setRecipeIngredients={setRecipeIngredients}
      />
    </Box>
  );
};
