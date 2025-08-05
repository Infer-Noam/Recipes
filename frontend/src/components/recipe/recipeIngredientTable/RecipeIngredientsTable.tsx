import { type FC } from "react";
import Styles from "./recipeIngredientsTable.style";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  AccordionActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MeasurementUnit } from "../../../../../shared/enums/measurement-unit.enum";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTableCell from "../../customTableCell/CustomTableCell";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { RecipeIngredientsTableProps } from "./RecipeIngredientsTableProps.type";
import useRecipeIngredient from "./useRecipeIngredient";

export const RecipeIngredientsTable: FC<RecipeIngredientsTableProps> = ({
  ingredients,
  control,
  recipeUuid,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const getIngredient = (ingredinetUuid?: string) =>
    ingredients.find((ingredient) => ingredient.uuid === ingredinetUuid);

  const getIngredientError = (index: number) =>
    Array.isArray(errors.ingredients) && errors.ingredients[index];

  return (
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
                          const ingredient = getIngredient(
                            recipeIngredient?.ingredient?.uuid
                          );

                          return (
                            <TableRow
                              key={recipeIngredient.uuid}
                              sx={Styles.recipeIngredientTableRow}
                            >
                              <TableCell sx={Styles.centerAlign}>
                                <Box sx={Styles.ingredientAutocompleteBox}>
                                  <Autocomplete
                                    sx={Styles.ingredientAutocomplete}
                                    value={ingredient?.name ?? ""}
                                    onChange={(
                                      _: any,
                                      newValue: string | null
                                    ) =>
                                      setIngredient(
                                        newValue,
                                        recipeIngredient.uuid
                                      )
                                    }
                                    options={ingredients.map(
                                      (ingredient) => ingredient.name
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={!!ingredientError?.ingredient}
                                        helperText={
                                          ingredientError?.ingredient
                                            ?.message &&
                                          "Ingredient is required"
                                        }
                                      />
                                    )}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell sx={Styles.centerAlign}>
                                <TextField
                                  type="number"
                                  value={recipeIngredient?.amount}
                                  onChange={(e) =>
                                    setAmount(
                                      parseInt(e.target.value),
                                      recipeIngredient.uuid
                                    )
                                  }
                                  slotProps={{
                                    input: {
                                      sx: Styles.amountTextFieldInput,
                                      inputProps: {
                                        min: 0,
                                        max: 99,
                                      },
                                    },
                                  }}
                                  variant="outlined"
                                  error={!!ingredientError?.amount}
                                  helperText={
                                    ingredientError?.amount?.message &&
                                    "Valid amount is required"
                                  }
                                />
                              </TableCell>
                              <TableCell sx={Styles.centerAlign}>
                                <Select
                                  sx={Styles.measurementUnitSelect}
                                  value={recipeIngredient.measurementUnit}
                                  onChange={(e) => {
                                    setMeasurementUnit(
                                      e.target.value,
                                      recipeIngredient.uuid
                                    );
                                  }}
                                  error={!!ingredientError?.measurementUnit}
                                >
                                  {Object.values(MeasurementUnit).map(
                                    (measurementUnit, index) => (
                                      <MenuItem
                                        key={index}
                                        value={measurementUnit}
                                      >
                                        {measurementUnit}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() =>
                                    removeRecipeIngredient(recipeUuid)
                                  }
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </AccordionDetails>
              <AccordionActions>
                <Button
                  onClick={() => addRecipeIngredient(recipeUuid)}
                  startIcon={<AddIcon />}
                >
                  Add ingredient
                </Button>
              </AccordionActions>
            </Accordion>
            {error && (
              <Typography
                color="error"
                variant="caption"
                sx={Styles.errorTypography}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
