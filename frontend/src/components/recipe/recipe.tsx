import { type FC, useState } from "react";
import {
  type RecipeDetails,
  type Recipe as RecipeModel,
} from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Tooltip,
  Grid,
  Button,
  Alert,
  AlertTitle,
  Paper
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecipeStepsList from "./recipeSteps/RecipeStepsList";
import { useNavigate } from "react-router-dom";
import type { DraftRecipeIngredient } from "./recipeIngredientTable/draftRecipeIngredient.type";
import type { SaveRecipeRes } from "@shared/http-types/recipe/saveRecipe.http-type";
import type { MutateOptions } from "@tanstack/react-query";
import Styles from "./recipe.style";
import { useParams } from "react-router-dom";
import { useGetRecipeByUuid } from "../../hooks/api/useGetRecipeByUuid.api";
import { RecipeCard } from "../../components/recipeCard/RecipeCard";
import { RecipeIngredientsTable } from "./recipeIngredientTable/RecipeIngredientsTable";
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
  const [chefUuid, setChefUuid] = useState(recipe.chef.uuid);

  const chefOptions = chefs.map((c) => c.email);

  return (
    <RecipeIngredientsTable
      recipeIngredients={recipe.ingredients}
      ingredientsOptions={ingredients}
    />
  );
};
