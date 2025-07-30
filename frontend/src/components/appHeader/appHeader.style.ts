import { type SxProps, type Theme } from "@mui/material";

const appHeader: SxProps<Theme> = (theme) => ({
  zIndex: {
    xs: theme.zIndex.drawer - 1,
    sm: theme.zIndex.drawer + 1,
  },
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  position: "static",
});

const typography: SxProps = {
  fontFamily: "Sansation",
  fontWeight: 600,
  fontStyle: "italic",
};

const menuIconButton: SxProps = {
  mr: 2,
  display: {
    xs: "flex",
    sm: "none",
  },
  color: "inherit",
  edge: "start",
};

const toggleColorIconButton: SxProps = {
  color: "inherit",
};
const spacer: SxProps = {
  flexGrow: 1,
};

const logo: SxProps = { height: "30px", ml: 1, mr: 1 };

export default {
  appHeader,
  menuIconButton,
  spacer,
  typography,
  logo,
  toggleColorIconButton,
};
