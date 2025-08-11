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

const StepsListItem: FC<StepsListItemProps> = ({ index, remove }) => (
  <ListItem>
    <ListItemText sx={Styles.textField}>
      <ControlledTextField
        name={`steps.${index}.text`}
        fullWidth
        multiline
        label={`Step ${index + 1}`}
      />
    </ListItemText>
    <ListItemIcon>
      <IconButton onClick={() => remove(index)}>
        <RemoveIcon />
      </IconButton>
    </ListItemIcon>
  </ListItem>
);

export default StepsListItem;
