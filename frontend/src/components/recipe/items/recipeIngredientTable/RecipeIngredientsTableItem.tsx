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
import { useFieldArray, useFormContext } from "react-hook-form";
import type { RecipeIngredientsTableItemProps } from "./recipeIngredientsTableItem.type";
import IngredientElement from "./elements/ingredient/IngredientElement";
import AmountElement from "./elements/amount/AmountElement";
import MeasurementUnitElement from "./elements/measurementUnit/MeasurementUnitElement";
import type { RecipeFormData } from "../../Recipe.type";
import DEFAULT_RECIPE_INGREDIENT_DETAILS from "./defaultRecipeIngredientDetails.const";
import ErrorElement from "./elements/error/ErrorElement";

export const RecipeIngredientsTableItem: FC<
  RecipeIngredientsTableItemProps
> = ({ ingredients }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<RecipeFormData>();

  const { fields, append, remove } = useFieldArray<
    RecipeFormData,
    "ingredients"
  >({
    control,
    name: "ingredients",
  });

  const recipeIngredients: RecipeFormData["ingredients"][0][] = fields;

  return (
    <Grid size={Styles.gridItemSize}>
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
                      return (
                        <TableRow
                          key={recipeIngredient.uuid}
                          sx={Styles.recipeIngredientTableRow}
                        >
                          <TableCell sx={Styles.centerAlign}>
                            <IngredientElement
                              index={index}
                              ingredients={ingredients}
                            />
                          </TableCell>
                          <TableCell sx={Styles.centerAlign}>
                            <AmountElement index={index} />
                          </TableCell>
                          <TableCell sx={Styles.centerAlign}>
                            <MeasurementUnitElement index={index} />
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => remove(index)}>
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
            <Button
              onClick={() =>
                append({
                  ...DEFAULT_RECIPE_INGREDIENT_DETAILS,
                  ingredient: ingredients[0],
                })
              }
              startIcon={<AddIcon />}
            >
              Add ingredient
            </Button>
          </AccordionActions>
        </Accordion>
        <ErrorElement
          error={isSubmitted && recipeIngredients.length === 0}
          errorMessage="At least one ingredient is required"
        />
      </Box>
    </Grid>
  );
};
