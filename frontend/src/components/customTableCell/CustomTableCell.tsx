import type { FC } from "react";
import Styles from "./customTableCell.style";
import { TableCell, Typography } from "@mui/material";

type CustomTableCellProps = {
  label: string;
};

const CustomTableCell: FC<CustomTableCellProps> = ({ label }) => (
  <TableCell align="center">
    <Typography variant="subtitle1" sx={Styles.labelTypography}>
      {label}
    </Typography>
  </TableCell>
);

export default CustomTableCell;
