import type { FC } from "react";
import { Menu, ListItemText, ListItemIcon } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Styles from "./recipeMenu.style";

type RecipeMenuProps = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  onDelete: () => void;
  onView: () => void;
};

export const RecipeMenu: FC<RecipeMenuProps> = ({
  open,
  onClose,
  anchorEl,
  onDelete,
  onView,
}) => {
  return (
    <Menu sx={Styles.menu} open={open} onClose={onClose} anchorEl={anchorEl}>
      <MenuItem
        onClick={() => {
          onView();
          close();
        }}
        disableRipple
      >
        <ListItemIcon>
          <FullscreenIcon />
        </ListItemIcon>
        <ListItemText>View</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onDelete();
          close();
        }}
        disableRipple
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
};
