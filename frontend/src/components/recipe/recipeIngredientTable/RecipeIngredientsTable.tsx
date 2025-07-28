import { type Dispatch, type FC, type SetStateAction } from "react";
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
import { type RecipeIngredient as RecipeIngredientModel } from "../../../../../shared/types/recipeIngredient.type";
import { type Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import { MeasurementUnit } from "../../../../../shared/enums/measurement-unit.enum";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { type DraftRecipeIngredient } from "./draftRecipeIngredient.type";
import { v4 as uuidv4 } from "uuid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type RecipeIngredientsTableProps = {
  recipeIngredients: DraftRecipeIngredient[];
  ingredients: IngredientModel[];
  setRecipeIngredients: Dispatch<SetStateAction<DraftRecipeIngredient[]>>;
};

export const RecipeIngredientsTable: FC<RecipeIngredientsTableProps> = ({
  recipeIngredients,
  ingredients,
  setRecipeIngredients,
}) => {
  const setRecipeIngredient = (
    updatedFields: Partial<RecipeIngredientModel>,
    uuid?: string
  ) => {
    setRecipeIngredients((prev) =>
      prev.map((ri) => (ri.uuid === uuid ? { ...ri, ...updatedFields } : ri))
    );
  };

  const CustomTableCell: FC<{ label: string }> = ({ label }) => (
    <TableCell sx={Styles.centerAlign}>
      <Typography variant="subtitle1" sx={Styles.labelTypography}>
        {label}
      </Typography>
    </TableCell>
  );

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
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
                {recipeIngredients.map((ri) => (
                  <TableRow key={ri.uuid} sx={Styles.recipeIngredientTableRow}>
                    <TableCell sx={Styles.centerAlign}>
                      <Box sx={Styles.ingredientAutocompleteBox}>
                        <Autocomplete
                          sx={Styles.ingredientAutocomplete}
                          value={
                            ingredients.find(
                              (i) => i.uuid === ri.ingredient?.uuid
                            )?.name ?? ""
                          }
                          onChange={(_: any, newValue: string | null) => {
                            if (!newValue) return;

                            const ingredientIndex = ingredients.findIndex(
                              (i) => i.name === newValue
                            );

                            if (ingredientIndex === -1) return;

                            setRecipeIngredient(
                              {
                                ingredient: ingredients[ingredientIndex],
                              },
                              ri.uuid
                            );
                          }}
                          options={ingredients.map((i) => i.name)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={Styles.centerAlign}>
                      <TextField
                        type="number"
                        value={ri?.amount}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value >= 0 && value <= 99) {
                            setRecipeIngredient({ amount: value }, ri.uuid);
                          }
                        }}
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
                      />
                    </TableCell>
                    <TableCell sx={Styles.centerAlign}>
                      <Select
                        sx={Styles.measurementUnitSelect}
                        value={ri.measurementUnit}
                        onChange={(e) => {
                          setRecipeIngredient(
                            {
                              measurementUnit: e.target.value,
                            },
                            ri.uuid
                          );
                        }}
                      >
                        {Object.values(MeasurementUnit).map((m, index) => (
                          <MenuItem key={index} value={m}>
                            {m}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          setRecipeIngredients((prev) =>
                            prev.filter((p) => ri.uuid !== p.uuid)
                          )
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow></TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </AccordionDetails>
      <AccordionActions>
        <Button
          onClick={() =>
            setRecipeIngredients((prev) => [...prev, { uuid: uuidv4() }])
          }
          startIcon={<AddIcon />}
        >
          Add ingredient
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
