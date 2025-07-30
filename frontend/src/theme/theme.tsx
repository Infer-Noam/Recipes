import {
  createTheme,
  type ThemeOptions,
  type Theme,
} from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export type ColorMode = "dark" | "light";

export const getColorModeIcon = (colorMode: ColorMode) =>
  colorMode === "light" ? <LightModeIcon /> : <DarkModeIcon />;

export const themeOptions: (colorMode: ColorMode) => ThemeOptions = (
  colorMode
) => ({
  palette: {
    mode: colorMode,
    primary: {
      main: "#ecececff",
    },
  },
});

export const createAppTheme: (colorMode: ColorMode) => Theme = (colorMode) =>
  createTheme(themeOptions(colorMode));
