import { Controller, useFormContext } from "react-hook-form";
import { useMemo, type FC } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Styles from "./chefItem.style";
import type { Chef as ChefModel } from "@shared/types/chef.type";

type ChefItemProps = {
  chefUuid: string;
  chefs: ChefModel[];
};

const ChefItem: FC<ChefItemProps> = ({ chefs, chefUuid }) => {
  const { control } = useFormContext();

  const chefMap = useMemo(
    () => Object.fromEntries(chefs.map((chef) => [chef.uuid, chef])),
    [chefs]
  );

  const chef = useMemo(() => chefMap[chefUuid], [chefUuid]);

  return (
    <Grid size={Styles.gridItemSize}>
      <Controller
        name="chef"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Tooltip
            arrow
            placement="right"
            title={
              chef && (
                <Box component="span">
                  <Typography>{`Email: ${chef?.email || ""}`}</Typography>
                  <Typography>{`Phone number: ${
                    chef?.phone || ""
                  }`}</Typography>
                </Box>
              )
            }
          >
            <Autocomplete
              options={chefs}
              getOptionLabel={(option) => {
                const chef = chefMap[option.uuid];
                return `${chef?.firstName} ${chef?.lastName}`;
              }}
              value={value || null}
              onChange={(_, newValue) => onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chef"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.uuid === value.uuid
              }
            />
          </Tooltip>
        )}
      />
    </Grid>
  );
};

export default ChefItem;
