import type { SxProps } from "@mui/material";

const container: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const image: SxProps = {
  width: {
    xs: "80%",
    sm: "60%",
    md: "40%",
    lg: "32.5%",
  },
  mb: 2,
};

const typography: SxProps = {
  fontSize: {
    xs: "1rem",
    sm: "1.25rem",
    md: "1.5rem",
  },
  textAlign: "center",
};

export default { container, image, typography };
