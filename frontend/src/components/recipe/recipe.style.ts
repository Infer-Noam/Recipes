import type { Theme, SxProps } from "@mui/material";
import { blue } from "@mui/material/colors";

const card: SxProps = { maxWidth: 345, borderRadius: "12px" };

// To be changed soon
const avatar: SxProps = { bgcolor: blue[500] };

const descriptionTypography: SxProps = { color: "text.secondary" };

const methodTypography: SxProps = { marginBottom: 2 };

const stepTypography: SxProps = { marginBottom: 2 };

const expandMore = (expand: boolean): SxProps<Theme> => ({
  marginLeft: "auto",
  transition: (theme) =>
    theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
});

export default {
  card,
  avatar,
  descriptionTypography,
  methodTypography,
  stepTypography,
  expandMore,
};
