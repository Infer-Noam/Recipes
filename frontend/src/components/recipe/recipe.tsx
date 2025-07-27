import { type FC, useState } from "react";
import { type RecipeDetails } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import { RecipeIngredientsTable } from "./recipeIngredientTable/recipeIngredientsTable";
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
} from "@mui/material";
import Styles from "./recipe.style";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecipeStepsList from "./recipeSteps/RecipeStepsList";
import type { DraftRecipeIngredient } from "./recipeIngredientTable/draftRecipeIngredient.type";
import type { SaveRecipeRes } from "@shared/http-types/recipe/saveRecipe.http-type";
import type { MutateOptions } from "@tanstack/react-query";
import type { RecipeIngredient } from "@shared/types/recipeIngredient.type";
import { isAxiosError } from "axios";

type RecipeProps = {
  uuid: string;
  initialName: string;
  initialChef: ChefModel | undefined;
  initialDescription: string;
  initialImageUrl: string;
  initialSteps: string[];
  initialIngredients: RecipeIngredient[];
  chefs: ChefModel[];
  ingredients: IngredientModel[];
  deleteRecipe: () => void;
  saveRecipe: (
    variables: RecipeDetails,
    options?:
      | MutateOptions<SaveRecipeRes, Error, RecipeDetails, unknown>
      | undefined
  ) => Promise<SaveRecipeRes>;
  close: () => void;
};

export const Recipe: FC<RecipeProps> = ({
  uuid,
  initialName,
  initialChef,
  initialDescription,
  initialImageUrl,
  initialSteps,
  initialIngredients,
  chefs,
  ingredients,
  deleteRecipe,
  saveRecipe,
  close,
}) => {
  const [name, setName] = useState(initialName);
  const [chef, setChef] = useState(initialChef);
  const [description, setDescription] = useState(initialDescription);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [steps, setSteps] = useState(initialSteps);
  const [recipeIngredients, setRecipeIngredients] =
    useState<DraftRecipeIngredient[]>(initialIngredients);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const isValidRecipeIngredient = (
    ingredient: DraftRecipeIngredient
  ): boolean => {
    if (typeof ingredient.amount !== "number") return false;
    if (typeof ingredient.measurementUnit !== "string") return false;
    if (typeof ingredient.ingredient?.uuid !== "string") return false;
    return true;
  };

  const save = async () => {
    setErrorMessage(undefined);

    const imageUrlRegex =
      /https?:\/\/[^\/\s]+\/[^\/\s]+\.(jpg|jpeg|png|gif|bmp)/i;

    const areIngredientsValid = recipeIngredients.every(
      isValidRecipeIngredient
    );

    let errorMessage: string | undefined = undefined;

    if (!areIngredientsValid)
      errorMessage = "Recipe contain invalid ingredient";
    if (!chef) errorMessage = "Recipe contain invalid chef";
    if (!imageUrlRegex.test(imageUrl))
      errorMessage = "Recipe contain invalid image";

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
    const recipeDetails: RecipeDetails = {
      uuid,
      name,
      chef: chef!,
      description,
      imageUrl,
      steps,
      ingredients: recipeIngredients.map((ri) => ({
        uuid: ri.uuid,
        recipe: { uuid },
        ingredient: { uuid: ri!.ingredient!.uuid! },
        amount: ri!.amount!,
        measurementUnit: ri!.measurementUnit!,
      })),
    };
    await saveRecipe(recipeDetails)
      .then(close)
      .catch((err) => {
        if (isAxiosError(err)) setErrorMessage(err.response?.data.message);
        else setErrorMessage(err?.message);
      });
  };

  return (
    <Grid container spacing={2} sx={Styles.gridContainer}>
      <Grid size={{ xs: 6, lg: 3.5, xl: 6 }}>
        <TextField
          fullWidth
          sx={Styles.nameTextField}
          id="outlined-basic"
          label="Recipe name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 6, lg: 4.5, xl: 6 }}>
        <Tooltip
          arrow
          placement="right"
          title={
            <Box component="span">
              <Typography>{`Email: ${chef?.email}`}</Typography>
              <Typography data-testid="phone">{`Phone number: ${chef?.phone}`}</Typography>
            </Box>
          }
        >
          <Autocomplete
            options={chefs}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            value={chef || null}
            onChange={(_, newValue: ChefModel | null) => {
              if (newValue) {
                setChef(newValue);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Chef" />}
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
          />
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
        <TextField
          fullWidth
          multiline
          id="outlined-basic"
          label="Short description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
        <TextField
          fullWidth
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
      </Grid>
      <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
        <RecipeStepsList steps={steps} setSteps={setSteps} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
        <RecipeIngredientsTable
          recipeIngredients={recipeIngredients}
          ingredients={ingredients}
          setRecipeIngredients={setRecipeIngredients}
        />
      </Grid>

      <Grid size={{ xs: 4, md: 3, lg: 4.1, xl: 3 }}>
        <Button fullWidth variant="outlined" size="large" onClick={save}>
          Save
        </Button>
      </Grid>

      <Grid size={{ xs: 4, md: 3, lg: 4.1, xl: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => {
            deleteRecipe();
            close();
          }}
        >
          Delete
        </Button>
      </Grid>

      {errorMessage && (
        <Grid size={{ xs: 8, md: 6.5, lg: 4, xl: 6.5 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};
