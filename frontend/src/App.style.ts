import type { SxProps, Theme } from "@mui/material";
import { drawerWidth } from "./components/sideDrawer/sideDrawer.const";
import { ColorMode } from "./theme/colorMode.enum";

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
  right: 0,
  top: {
    xs: "56px",
    sm: "64px",
  },
  bottom: 0,
  padding: theme.spacing(3),
  overflow: "auto",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor:
      theme.palette.mode === ColorMode.DARK
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor:
      theme.palette.mode === ColorMode.DARK
        ? theme.palette.grey[600]
        : theme.palette.grey[400],
    borderRadius: "4px",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === ColorMode.DARK
          ? theme.palette.grey[500]
          : theme.palette.grey[500],
    },
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor:
      theme.palette.mode === ColorMode.DARK
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
  },

  scrollbarWidth: "thin",
  scrollbarColor:
    theme.palette.mode === ColorMode.DARK
      ? `${theme.palette.grey[600]} ${theme.palette.grey[800]}`
      : `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,
});
export default {
  rootLayout,
  contentArea,
};
