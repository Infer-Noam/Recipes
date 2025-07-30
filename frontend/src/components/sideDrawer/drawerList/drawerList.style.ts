import { type SxProps } from "@mui/material";
import { drawerWidth } from "../sideDrawer.const";

const container: SxProps = {
  width: drawerWidth,
};

const listItem: SxProps = {
  borderRadius: 4,
  ml: "7.5px",
  mr: "7.5px",
  mt: "2.5px",
  mb: "2.5px",
};

export default { container, listItem };
