import type { SxProps, Theme } from "@mui/material";
import { ColorMode } from "../../theme/colorMode.enum";

const errorContainer: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const backdrop: SxProps<Theme> = (theme) => ({
  color:
    theme.palette.mode === ColorMode.DARK
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  zIndex: theme.zIndex.drawer + 1,
});

export default { errorContainer, backdrop };
