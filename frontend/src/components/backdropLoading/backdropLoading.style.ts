import type { SxProps, Theme } from "@mui/material";
import { ColorMode } from "src/theme/colorMode.enum";

const backdrop: SxProps<Theme> = (theme) => ({
  color:
    theme.palette.mode === ColorMode.DARK
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  zIndex: theme.zIndex.drawer + 1,
});

export default { backdrop };
