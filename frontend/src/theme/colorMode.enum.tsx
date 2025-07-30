import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export enum ColorMode {
  DARK = "dark",
  LIGHT = "light",
}

export const getColorModeIcon = (colorMode: ColorMode) =>
  colorMode === ColorMode.LIGHT ? <LightModeIcon /> : <DarkModeIcon />;
