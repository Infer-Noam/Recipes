import type { SxProps, Theme } from "@mui/material";

const card: SxProps = { width: "275px", borderRadius: 4 };

const descriptionTypography: SxProps = { color: "text.secondary" };

const methodTypography: SxProps = { marginBottom: 2 };

const tooltip: SxProps = { ml: "auto" };

const chefAvatar: SxProps<Theme> = (theme) => ({
  border: `1.5px solid ${theme.palette.border.primary}`,
});

const image: SxProps = {
  height: "200px",
};
export default {
  card,
  descriptionTypography,
  methodTypography,
  tooltip,
  chefAvatar,
  image,
};
