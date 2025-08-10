import { type FC } from "react";
import Styles from "./stepsItem.style";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import StepsListItem from "./stepListItem/StepsListItem";
import type { RecipeStepFormData } from "./stepItem.type";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  Typography,
  useMediaQuery,
  Grid,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { DEFAULT_RECIPE_STEP_DETAILS } from "./stepsItem.const";
import { useSortedSteps } from "./useSortedSteps";

const StepsItem: FC = () => {
  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<RecipeFormData>();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const recipeSteps: RecipeStepFormData[] = useSortedSteps(fields);

  return (
    <Grid size={Styles.gridItemSize}>
      <Box>
        <Accordion defaultExpanded={!isXs}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Steps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {recipeSteps.map((step) => (
                <StepsListItem key={step.uuid} step={step} remove={remove} />
              ))}
            </List>
          </AccordionDetails>
          <AccordionActions>
            <Button
              onClick={() => append(DEFAULT_RECIPE_STEP_DETAILS)}
              startIcon={<AddIcon />}
            >
              Add step
            </Button>
          </AccordionActions>
        </Accordion>
        {isSubmitted && !recipeSteps && (
          <Typography
            color="error"
            variant="caption"
            sx={Styles.errorTypography}
          >
            At least one step is required
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default StepsItem;
