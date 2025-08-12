import { type FC } from "react";
import Styles from "./stepsItem.style";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import StepsListItem from "./stepListItem/StepsListItem";
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
import { closestCenter, DndContext } from "@dnd-kit/core";
import { onDragEnd, sensors } from "./stepItem.util";

const StepsItem: FC = () => {
  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<RecipeFormData>();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    fields: recipeSteps,
    append,
    remove,
    move,
  } = useFieldArray({
    control,
    name: "steps",
  });

  return (
    <Grid size={Styles.gridItemSize}>
      <Box>
        <Accordion defaultExpanded={!isXs}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Steps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DndContext
              sensors={sensors}
              onDragEnd={(event) => onDragEnd(event, move)}
              collisionDetection={closestCenter}
            >
              <List>
                {recipeSteps.map((step, index) => (
                  <StepsListItem
                    id={step.id}
                    key={step.id}
                    index={index}
                    remove={remove}
                  />
                ))}
              </List>
            </DndContext>
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
        {isSubmitted && recipeSteps.length === 0 && (
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
