import { Box, Tooltip, Typography } from "@mui/material";
import { type FC, type ReactElement } from "react";
import type { ChefFormData } from "./chefItem.type";

type ChefTooltipProps = {
  chef: ChefFormData;
  children: ReactElement;
};

const ChefTooltip: FC<ChefTooltipProps> = ({ chef, children }) => (
  <Tooltip
    arrow
    placement="right"
    title={
      chef && (
        <Box component="span">
          <Typography>{`Email: ${chef?.email || ""}`}</Typography>
          <Typography>{`Phone number: ${chef?.phone || ""}`}</Typography>
        </Box>
      )
    }
  >
    {children}
  </Tooltip>
);

export default ChefTooltip;
