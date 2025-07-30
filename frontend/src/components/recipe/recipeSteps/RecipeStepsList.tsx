import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import type { FC, Dispatch, SetStateAction } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

type RecipeStepsListProps = {
  steps: string[];
  setSteps: Dispatch<SetStateAction<string[]>>;
};
const RecipeStepsList: FC<RecipeStepsListProps> = ({ steps, setSteps }) => {
  const setStep = (index: number, newStep: string) => {
    setSteps((steps) => steps.map((s, i) => (index === i ? newStep : s)));
  };

  const addStep = () => {
    setSteps((steps) => [...steps, ""]);
  };

  const removeStep = (index: number) => {
    setSteps((steps) => steps.filter((_, i) => index !== i));
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span">Steps</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {steps.map((step, index) => {
            return (
              <ListItem key={index}>
                <ListItemText>
                  <TextField
                    multiline
                    id="outlined-basic"
                    label={`Step ${index + 1}`}
                    variant="outlined"
                    value={step}
                    onChange={(e) => setStep(index, e.target.value)}
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
  );
};

export default RecipeStepsList;
