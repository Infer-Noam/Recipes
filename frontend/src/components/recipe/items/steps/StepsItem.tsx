import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import type { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import Styles from "./stepsItem.style";
import { Controller, useFormContext } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";

const StepsItem: FC = () => {
  const setStep = (
    index: number,
    steps: string[],
    newStep: string,
    onChange: (...event: any[]) => void
  ) => {
    onChange(steps.map((step, i) => (index === i ? newStep : step)));
  };

  const addStep = (steps: string[], onChange: (...event: any[]) => void) => {
    onChange([...steps, ""]);
  };

  const removeStep = (
    index: number,
    steps: string[],
    onChange: (...event: any[]) => void
  ) => {
    onChange(steps.filter((_, i) => index !== i));
  };

  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeFormData>();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid size={Styles.gridItemSize}>
      <Controller
        name="steps"
        control={control}
        render={({
          field: { value: steps, onChange },
          fieldState: { error },
        }) => (
          <Box>
            <Accordion defaultExpanded={!isXs}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span">Steps</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {steps.map((step, index) => {
                    const stepError =
                      Array.isArray(errors.steps) && errors.steps[index];

                    return (
                      <ListItem key={index}>
                        <ListItemText sx={Styles.textField}>
                          <TextField
                            multiline
                            fullWidth
                            id="outlined-basic"
                            label={`Step ${index + 1}`}
                            variant="outlined"
                            value={step}
                            onChange={(e) =>
                              setStep(index, steps, e.target.value, onChange)
                            }
                            error={!!stepError}
                            helperText={stepError?.message}
                          />
                        </ListItemText>
                        <ListItemIcon>
                          <IconButton
                            onClick={() => removeStep(index, steps, onChange)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  onClick={() => addStep(steps, onChange)}
                  startIcon={<AddIcon />}
                >
                  Add step
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
        )}
      />
    </Grid>
  );
};

export default StepsItem;
