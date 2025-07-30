import { type SxProps, type Theme } from "@mui/material";
import { drawerWidth } from "./sideDrawer.const";

const drawer: SxProps = {
  width: drawerWidth,
  flexShrink: 0,
};

const permanentDrawer: SxProps = {
  ...drawer,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
  display: { xs: "none", sm: "block" },
};

const temporaryDrawer: SxProps = {
  ...drawer,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
  display: { xs: "block", sm: "none" },
};

const temporaryDrawerPaper: SxProps<Theme> = {
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
};

const permenentDrawerPaper: SxProps<Theme> = {
  borderBottomRightRadius: 8,
};

const drawerHeader: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
});

export default {
  permanentDrawer,
  permenentDrawerPaper,
  temporaryDrawer,
  temporaryDrawerPaper,
  drawerHeader,
};
