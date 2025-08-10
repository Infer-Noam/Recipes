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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTableCell from "../../../customTableCell/CustomTableCell";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { RecipeIngredientsTableItemProps } from "./recipeIngredientsTableItem.type";
import type { RecipeFormData } from "../../Recipe.type";
import {
  DEFAULT_RECIPE_INGREDIENT_DETAILS,
  HEADER_LABELS,
} from "./recipeIngredientsTableItem.const";
import ErrorElement from "./elements/error/ErrorElement";
import RecipeIngredientsTableRow from "./recipeIngredientsTableRow/RecipeIngredientsTableRow";

export const RecipeIngredientsTableItem: FC<
  RecipeIngredientsTableItemProps
> = ({ ingredients }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<RecipeFormData>();

  const {
    fields: recipeIngredients,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <Grid size={Styles.gridItemSize}>
      <Box>
        <Accordion defaultExpanded={!isXs}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Ingredients</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {!!recipeIngredients.length && (
              <TableContainer component={Paper}>
                <Table sx={Styles.container}>
                  <TableHead>
                    <TableRow>
                      {HEADER_LABELS.map((label, index) => (
                        <CustomTableCell label={label} key={index} />
                      ))}
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <RecipeIngredientsTableRow
                      recipeIngredients={recipeIngredients}
                      ingredients={ingredients}
                      remove={remove}
                    />
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
