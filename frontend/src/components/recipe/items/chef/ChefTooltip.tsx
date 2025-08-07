import { Box, Tooltip, Typography } from "@mui/material";
import type { Chef as ChefModel } from "@shared/types/chef.type";
import { useMemo, type FC, type ReactElement } from "react";

type ChefTooltipProps = {
  chefMap: {
    [k: string]: ChefModel;
  };
  chefUuid: string;
  children: ReactElement;
};

const ChefTooltip: FC<ChefTooltipProps> = ({ chefMap, chefUuid, children }) => {
  const chef = useMemo(() => chefMap[chefUuid], [chefUuid]);

  const ChefTooltipTitle: FC = () =>
    chef && (
      <Box component="span">
        <Typography>{`Email: ${chef?.email || ""}`}</Typography>
        <Typography>{`Phone number: ${chef?.phone || ""}`}</Typography>
      </Box>
    );

  return (
    <Tooltip arrow placement="right" title={<ChefTooltipTitle />}>
      {children}
    </Tooltip>
  );
};

export default ChefTooltip;
