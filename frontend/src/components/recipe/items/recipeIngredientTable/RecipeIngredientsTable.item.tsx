import { type FC } from "react";
import Styles from "./recipeIngredientsTableItem.style";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  AccordionActions,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTableCell from "../../../customTableCell/CustomTableCell";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { RecipeIngredientsTableItemProps } from "./recipeIngredientsTableItem.type";
import useRecipeIngredient from "./useRecipeIngredient";
import IngredientElement from "./elements/ingredient/Ingredient.element";
import AmountElement from "./elements/amount/Amount.element";
import MeasurementUnitElement from "./elements/measurementUnit/MeasurementUnit.element";
import ErrorElement from "./elements/error/Error.element";

export const RecipeIngredientsTableItem: FC<
  RecipeIngredientsTableItemProps
> = ({ ingredients, control }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const getIngredientError = (index: number) =>
    Array.isArray(errors.ingredients) && errors.ingredients[index];

  return (
    <Grid size={Styles.gridItemSize}>
      <Controller
        name="ingredients"
        control={control}
        render={({
          field: { value: recipeIngredients, onChange: setRecipeIngredients },
          fieldState: { error },
        }) => {
          const {
            addRecipeIngredient,
            removeRecipeIngredient,
            setAmount,
            setMeasurementUnit,
            setIngredient,
          } = useRecipeIngredient(
            recipeIngredients,
            setRecipeIngredients,
            ingredients
          );

          return (
            <Box>
              <Accordion defaultExpanded={!isXs}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="span">Ingredients</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {recipeIngredients.length > 0 && (
                    <TableContainer component={Paper}>
                      <Table sx={Styles.container} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <CustomTableCell label="Ingredient" />
                            <CustomTableCell label="Amount" />
                            <CustomTableCell label="Measurement unit" />
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recipeIngredients.map((recipeIngredient, index) => {
                            const ingredientError = getIngredientError(index);

                            return (
                              <TableRow
                                key={recipeIngredient.uuid}
                                sx={Styles.recipeIngredientTableRow}
                              >
                                <TableCell sx={Styles.centerAlign}>
                                  <IngredientElement
                                    ingredients={ingredients}
                                    recipeIngredient={recipeIngredient}
                                    setIngredient={setIngredient}
                                    error={ingredientError?.ingredient}
                                  />
                                </TableCell>
                                <TableCell sx={Styles.centerAlign}>
                                  <AmountElement
                                    recipeIngredient={recipeIngredient}
                                    setAmount={setAmount}
                                    error={ingredientError?.amount}
                                  />
                                </TableCell>
                                <TableCell sx={Styles.centerAlign}>
                                  <MeasurementUnitElement
                                    recipeIngredient={recipeIngredient}
                                    setMeasurementUnit={setMeasurementUnit}
                                    error={ingredientError?.measurementUnit}
                                  />
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={() =>
                                      removeRecipeIngredient(
                                        recipeIngredient.uuid
                                      )
                                    }
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </AccordionDetails>
                <AccordionActions>
                  <Button onClick={addRecipeIngredient} startIcon={<AddIcon />}>
                    Add ingredient
                  </Button>
                </AccordionActions>
              </Accordion>
              <ErrorElement error={error} />
            </Box>
          );
        }}
      />
    </Grid>
  );
};
