import { useState, type FC } from "react";
import { type RecipeDetails } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
import { type Ingredient as IngredientModel } from "../../../../shared/types/ingredient.type";
import { RecipeIngredientsTable } from "./recipeIngredientTable/RecipeIngredientsTable";
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
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeDetailsSchema } from "../../../../shared/validation/recipeDetailsSchema.validation";
import type { RecipeInputs } from "./recipeInputs.type";
import defaultRecipeDetails from "./defaultRecipeDetails.const";
import { useSwal } from "../../hooks/useSwal";

type RecipeProps = {
  uuid: string;
  initialRecipe: RecipeDetails | undefined;
  chefs: ChefModel[];
  ingredients: IngredientModel[];
};

export const Recipe: FC<RecipeProps> = ({
  uuid,
  initialRecipe,
  chefs,
  ingredients,
}) => {
  const navigate = useNavigate();

  const { showError } = useSwal();

  const methods = useForm({
    defaultValues: initialRecipe ?? defaultRecipeDetails,
    resolver: zodResolver(RecipeDetailsSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = methods;

  const allValues = watch();
   const onSuccess = () => navigate(-1);
   
  const { mutateAsync: saveRecipe } = useSaveRecipe(
    (err) => showError(err, "Failed to save recipe"),
    onSuccess
  );

  const { mutate: deleteRecipe } = useDeleteRecipe(
    (err) => showError(err, "Failed to delete recipe"),
    onSuccess
  );

  const onSubmit = async () => {
    await saveRecipe(allValues);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={Styles.gridContainer}>
          <Grid size={{ xs: 6, lg: 3.5, xl: 6 }}>
            <TextField
              fullWidth
              sx={Styles.nameTextField}
              id="outlined-basic"
              label="Recipe name"
              variant="outlined"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name && "Recipe name is required"}
            />
          </Grid>
          <Grid size={{ xs: 6, lg: 4.5, xl: 6 }}>
            <Controller
              name="chef"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Tooltip
                  arrow
                  placement="right"
                  title={
                    <Box component="span">
                      <Typography>{`Email: ${
                        chefs.find((c) => c.uuid === allValues?.chef?.uuid)
                          ?.email || ""
                      }`}</Typography>
                      <Typography>{`Phone number: ${
                        chefs.find((c) => c.uuid === allValues?.chef?.uuid)
                          ?.phone || ""
                      }`}</Typography>
                    </Box>
                  }
                >
                  <Autocomplete
                    options={chefs}
                    getOptionLabel={(option) => {
                      const chef = chefs.find((c) => c.uuid === option.uuid);
                      return `${chef?.firstName} ${chef?.lastName}`;
                    }}
                    value={value || null}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chef"
                        error={!!errors.chef}
                        helperText={errors.chef && "Chef is required"}
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.uuid === value.uuid
                    }
                  />
                </Tooltip>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
            <TextField
              fullWidth
              multiline
              id="outlined-basic"
              label="Short description"
              variant="outlined"
              {...register("description")}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Image url"
              variant="outlined"
              {...register("imageUrl")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={"Open image"}
                        onClick={() => window.open(allValues?.imageUrl)}
                        edge="end"
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl && "Valid image URL is required"}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
            <RecipeStepsList control={control} />
          </Grid>
          <Grid size={{ xs: 12, lg: 8, xl: 6 }}>
            <RecipeIngredientsTable
              ingredients={ingredients}
              control={control}
              recipeUuid={uuid}
            />
          </Grid>

          <Grid size={{ xs: 4, md: 3, lg: 4.1, xl: 3 }}>
            <Button fullWidth variant="outlined" size="large" type="submit">
              Save
            </Button>
          </Grid>

          <Grid size={{ xs: 4, md: 3, lg: 4.1, xl: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => {
                deleteRecipe(uuid);
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};
