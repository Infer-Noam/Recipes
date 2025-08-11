import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
} from "@mui/material";
``;
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { FC } from "react";
import Styles from "./stepListItem.style";
import type { StepsListItemProps } from "./stepsListItem.type";
import ControlledTextField from "../../../../../components/controlledTextField/ControlledTextField";

const StepsListItem: FC<StepsListItemProps> = ({
  index,
  remove,
  move,
  stepsSize,
}) => (
  <ListItem>
    <ListItemIcon>
      <Box sx={Styles.moveIconsBox}>
        <Tooltip title="Move up">
          <IconButton
            size="small"
            onClick={() => move(index, index - 1)}
            disabled={index === 0}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Move down">
          <IconButton
            size="small"
            onClick={() => move(index, index + 1)}
            disabled={index === stepsSize - 1}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </ListItemIcon>
    <ListItemText sx={Styles.textField}>
      <ControlledTextField
        name={`steps.${index}.text`}
        fullWidth
        multiline
        label={`Step ${index + 1}`}
      />
    </ListItemText>

    <ListItemIcon>
      <IconButton onClick={() => remove(index)} color="error">
        <RemoveIcon />
      </IconButton>
    </ListItemIcon>
  </ListItem>
);

export default StepsListItem;
