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
import useSteps from "./useSteps";

const StepsItem: FC = () => {
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
        }) => {
          const { setStep, addStep, removeStep } = useSteps(steps, onChange);

          return (
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
                              label={`Step ${index + 1}`}
                              value={step}
                              onChange={(e) => setStep(index, e.target.value)}
                              error={!!stepError}
                              helperText={stepError?.message}
                            />
                          </ListItemText>
                          <ListItemIcon>
                            <IconButton onClick={() => removeStep(index)}>
                              <RemoveIcon />
                            </IconButton>
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
                <AccordionActions>
                  <Button onClick={addStep} startIcon={<AddIcon />}>
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
          );
        }}
      />
    </Grid>
  );
};

export default StepsItem;
