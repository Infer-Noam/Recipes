import type { FC } from "react";
import Styles from "./centralErrorAlert.style";
import { Box, Alert } from "@mui/material";

type Props = {
  text: string;
};

const CentralErrorAlert: FC<Props> = ({ text }) => (
  <Box sx={Styles.errorContainer}>
    <Alert sx={Styles.errorAlert} severity="error">
      {text}
    </Alert>
  </Box>
);

export default CentralErrorAlert;
