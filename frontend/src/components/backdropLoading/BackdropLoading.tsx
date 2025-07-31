import { Backdrop, CircularProgress } from "@mui/material";
import type { FC } from "react";
import Styles from "./backdropLoading.style";

const BackdropLoading: FC = () => (
  <Backdrop sx={Styles.backdrop} open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default BackdropLoading;
