import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { type FC, useState } from "react";
import { drawerListItems } from "./drawerListItem/drawerListItems.const";
import Styles from "./drawerList.style";
import { useNavigate } from "react-router-dom";

type DrawerListProps = {
  handleMobileDrawerClose?: () => void;
};

export const DrawerList: FC<DrawerListProps> = ({
  handleMobileDrawerClose,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

  return (
    <Box sx={Styles.container} role="presentation">
      <List>
        {drawerListItems.map(({ name, path, icon: ItemIcon }, index) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              sx={Styles.listItem}
              onClick={() => {
                setSelectedIndex(index);
                handleMobileDrawerClose?.();
                navigate(path);
              }}
              selected={index === selectedIndex}
            >
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
