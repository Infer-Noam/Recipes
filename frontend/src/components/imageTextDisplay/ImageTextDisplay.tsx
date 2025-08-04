import { Box, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import Styles from "./imageTextDisplay.style";

type Props = {
  src: string;
  children: ReactNode;
};

const ImageTextDisplay: FC<Props> = ({ src, children }) => (
  <Box sx={Styles.container}>
    <Box
      component="img"
      src={src}
      sx={Styles.image}
    />
    <Typography
      variant="body2"
      sx={Styles.typography}
      children={children}
    />
  </Box>
);

export default ImageTextDisplay;
