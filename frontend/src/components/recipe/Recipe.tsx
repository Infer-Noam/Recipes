import { type FC } from "react";
import { type RecipeDetails } from "@shared/types/recipe.type";
import { RecipeIngredientsTableItem } from "./items/recipeIngredientTable/RecipeIngredientsTableItem";
import { Grid, Button } from "@mui/material";
import Styles from "./recipe.style";
import StepsItem from "./items/steps/StepsItem";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSaveRecipe } from "../../hooks/api/useSaveRecipe.api";
import { useDeleteRecipe } from "../../hooks/api/useDeleteRecipe.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeDetailsSchema } from "@shared/validation/recipeDetailsSchema.validation";
import { DEFAULT_RECIPE_DETAILS } from "./defaultRecipeDetails.const";
import { useSwal } from "../../hooks/useSwal";
import type { RecipeFormData, RecipeProps } from "./Recipe.type";
import ControlledTextField from "../controlledTextField/ControlledTextField";
import NameItem from "./items/name/NameItem";
import ChefItem from "./items/chef/ChefItem";
import ImageItem from "./items/image/ImageItem";

export const Recipe: FC<RecipeProps> = ({
  initialRecipe,
  chefs,
  ingredients,
}) => {
  const navigate = useNavigate();

  const { showError } = useSwal();

  const methods = useForm<RecipeFormData>({
    defaultValues: initialRecipe ?? DEFAULT_RECIPE_DETAILS,
    resolver: zodResolver(RecipeDetailsSchema),
  });

  const { handleSubmit, watch } = methods;

  const [chef, imageUrl] = watch(["chef", "imageUrl"]);

  const onSuccess = () => navigate(-1);

  const { mutateAsync: saveRecipe } = useSaveRecipe(
    (err) => showError(err, "Failed to save recipe"),
    onSuccess
  );

  const { mutate: deleteRecipe } = useDeleteRecipe(
    (err) => showError(err, "Failed to delete recipe"),
    onSuccess
  );

  const onSubmit = async (recipeDetails: RecipeDetails) => {
    await saveRecipe({
      ...recipeDetails,
      steps: recipeDetails.steps.map((step, index) => ({
        ...step,
        placement: index + 1,
      })),
    });
  };

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2} sx={Styles.gridContainer}>
        <NameItem />
        <ChefItem chefUuid={chef?.uuid} chefs={chefs} />
        <Grid size={Styles.descriptionItemGridSize}>
          <ControlledTextField
            name="description"
            fullWidth
            multiline
            label="Short description"
          />
        </Grid>
        <ImageItem imageUrl={imageUrl} />
        <StepsItem />
        <RecipeIngredientsTableItem ingredients={ingredients} />
        <Grid size={Styles.saveGridItemSize}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Grid>
        {initialRecipe?.uuid && (
          <Grid size={Styles.deleteGridItemSize}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() =>
                initialRecipe?.uuid && deleteRecipe(initialRecipe.uuid)
              }
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
};
