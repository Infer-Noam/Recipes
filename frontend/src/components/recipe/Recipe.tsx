import { useMemo, type FC } from "react";
import { type RecipeDetails } from "../../../../shared/types/recipe.type";
import { type Chef as ChefModel } from "../../../../shared/types/chef.type";
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
} from "@mui/material";
import Styles from "./recipe.style";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecipeStepsList from "./recipeSteps/RecipeStepsList";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeDetailsSchema } from "../../../../shared/validation/recipeDetailsSchema.validation";
import DEFAULT_RECIPE_DETAILS from "./defaultRecipeDetails.const";
import { useSwal } from "../../hooks/useSwal";
import { z } from "zod";
import type { RecipeProps } from "./RecipeProps.type";

export type RecipeFormData = z.infer<typeof RecipeDetailsSchema>;

export const Recipe: FC<RecipeProps> = ({
  initialRecipe,
  chefs,
  ingredients,
}) => {
  const navigate = useNavigate();

  const { showError } = useSwal();

  const methods = useForm<RecipeFormData>({
    defaultValues: initialRecipe ?? { ...DEFAULT_RECIPE_DETAILS },
    resolver: zodResolver(RecipeDetailsSchema),
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = methods;

  const chef = watch("chef");

  const onSuccess = () => navigate(-1);

  const { mutateAsync: saveRecipe } = useSaveRecipe(
    (err) => showError(err, "Failed to save recipe"),
    onSuccess
  );

  const { mutate: deleteRecipe } = useDeleteRecipe(
    (err) => showError(err, "Failed to delete recipe"),
    onSuccess
  );

  const chefMap = useMemo(() => {
    return chefs.reduce((acc: Record<string, ChefModel>, chef) => {
      acc[chef.uuid] = chef;
      return acc;
    }, {});
  }, [chefs]);

  const chefModel = useMemo(() => chefMap[chef?.uuid], [chef]);

  const onSubmit = async (recipeDetails: RecipeDetails) => {
    await saveRecipe(recipeDetails);
  };

  console.log(JSON.stringify(errors));
  return (
    <FormProvider {...methods}>
      <Grid container spacing={2} sx={Styles.gridContainer}>
        <Grid size={Styles.nameGridSize}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Recipe name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name && "Recipe name is required"}
              />
            )}
          />
        </Grid>
        <Grid size={Styles.chefGridSize}>
          <Controller
            name="chef"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Tooltip
                arrow
                placement="right"
                title={
                  chefModel && (
                    <Box component="span">
                      <Typography>{`Email: ${
                        chefModel?.email || ""
                      }`}</Typography>
                      <Typography>{`Phone number: ${
                        chefModel?.phone || ""
                      }`}</Typography>
                    </Box>
                  )
                }
              >
                <Autocomplete
                  options={chefs}
                  getOptionLabel={(option) => {
                    const chef = chefMap[option.uuid];
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
        <Grid size={Styles.descriptionGridSize}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                label="Short description"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid size={Styles.imageGridSize}>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Image url"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Open image"
                          onClick={() => window.open(field.value)}
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
            )}
          />
        </Grid>
        <Grid size={Styles.stepListGridSize}>
          <RecipeStepsList control={control} />
        </Grid>
        <Grid size={Styles.ingredientTableGridSize}>
          <RecipeIngredientsTable ingredients={ingredients} control={control} />
        </Grid>

        <Grid size={Styles.saveGridSize}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Grid>

        <Grid size={Styles.deleteGridSize}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => {
              const uuid = initialRecipe?.uuid;
              uuid ? deleteRecipe(uuid) : onSuccess();
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
