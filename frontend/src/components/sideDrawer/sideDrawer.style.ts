import { type SxProps, type Theme } from "@mui/material";
import { DRAWER_WIDTH } from "./sideDrawer.const";

const drawer: SxProps = {
  width: DRAWER_WIDTH,
  flexShrink: 0,
};

const permanentDrawer: SxProps = {
  ...drawer,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    boxSizing: "border-box",
  },
  display: { xs: "none", sm: "block" },
};

const temporaryDrawer: SxProps = {
  ...drawer,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    boxSizing: "border-box",
  },
  display: { xs: "block", sm: "none" },
};

const temporaryDrawerPaper: SxProps = {
  borderEndRadius: 8,
};

const permenentDrawerPaper: SxProps = {
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
