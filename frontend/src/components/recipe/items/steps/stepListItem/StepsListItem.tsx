import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
``;
import RemoveIcon from "@mui/icons-material/Remove";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import type { FC } from "react";
import Styles from "./stepListItem.style";
import type { StepsListItemProps } from "./stepsListItem.type";
import ControlledTextField from "../../../../../components/controlledTextField/ControlledTextField";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const StepsListItem: FC<StepsListItemProps> = ({ id, index, remove }) => {
  const {
    attributes,
    listeners,
    setNodeRef: dragRef,
    transform,
  } = useDraggable({
    id: `draggable-${id}`,
    data: { index },
  });

  const { setNodeRef: dropRef } = useDroppable({
    id: `droppable-${id}`,
    data: { index },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <ListItem ref={dropRef} style={style} sx={Styles.listItem}>
      <ListItemIcon>
        <Tooltip
          title="Drag to reorder"
          sx={Styles.moveIconsBox}
          ref={dragRef}
          {...listeners}
          {...attributes}
        >
          <IconButton size="small">
            <DragIndicatorIcon />
          </IconButton>
        </Tooltip>
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
};

export default StepsListItem;
