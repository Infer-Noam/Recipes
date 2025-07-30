import type { SxProps, Theme } from "@mui/material";
import { drawerWidth } from "./components/sideDrawer/sideDrawer.const";

const rootLayout: SxProps<Theme> = (theme) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: theme.palette.background.default,
});

const contentArea: SxProps<Theme> = (theme) => ({
  position: "fixed",
  left: { xs: 0, sm: drawerWidth },
  padding: theme.spacing(3),
  overflow: "auto",
});

export default {
  rootLayout,
  contentArea,
};
