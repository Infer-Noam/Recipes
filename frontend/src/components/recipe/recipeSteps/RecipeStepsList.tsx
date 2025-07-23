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
  useMediaQuery,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Styles from "./recipeStepsList.style";
import type { FC, Dispatch, SetStateAction } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

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

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Accordion defaultExpanded={!isXs}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span">Steps</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {steps.map((step, index) => {
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
