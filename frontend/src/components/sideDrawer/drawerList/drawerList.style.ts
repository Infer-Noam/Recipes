import { type SxProps } from "@mui/material";
import { drawerWidth } from "../sideDrawer.const";

const container: SxProps = {
  width: drawerWidth,
};

const listItem: SxProps = {
  borderRadius: 4,
  mx: "7.5px",
  my: "2.5px",
};

export default { container, listItem };
