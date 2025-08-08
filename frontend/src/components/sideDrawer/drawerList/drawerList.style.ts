import { type SxProps } from "@mui/material";
import { DRAWER_WIDTH } from "../sideDrawer.const";

const container: SxProps = {
  width: DRAWER_WIDTH,
};

const listItem: SxProps = {
  borderRadius: 4,
  mx: "7.5px",
  my: "2.5px",
};

export default { container, listItem };
