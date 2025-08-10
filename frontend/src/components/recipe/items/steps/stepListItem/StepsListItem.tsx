import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import type { FC } from "react";
import Styles from "./stepListItem.style";
import type { StepsListItemProps } from "./stepsListItem.type";
import ControlledTextField from "src/components/controlledTextField/ControlledTextField";

const StepsListItem: FC<StepsListItemProps> = ({ step, remove }) => (
  <ListItem key={step.uuid}>
    <ListItemText sx={Styles.textField}>
      <ControlledTextField
        name={`steps.${step.placement}.text`}
        fullWidth
        multiline
        label={`Step ${step.placement}`}
      />
    </ListItemText>
    <ListItemIcon>
      <IconButton onClick={() => remove(step.placement)}>
        <RemoveIcon />
      </IconButton>
    </ListItemIcon>
  </ListItem>
);

export default StepsListItem;
