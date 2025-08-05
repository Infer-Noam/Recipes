import { Controller, type Control } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useMemo, type FC } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Styles from "./chef.style";
import type { Chef as ChefModel } from "../../../../../../shared/types/chef.type";

type ChefItemProps = {
  chef: {
    uuid: string;
  };
  chefs: ChefModel[];
  control: Control<RecipeFormData, unknown, RecipeFormData>;
  error:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          uuid: string;
        }>
      >
    | undefined;
};

const ChefItem: FC<ChefItemProps> = ({ chefs, chef, control, error }) => {
  const chefMap = useMemo(() => {
    return chefs.reduce((acc: Record<string, ChefModel>, chef) => {
      acc[chef.uuid] = chef;
      return acc;
    }, {});
  }, [chefs]);

  const chefModel = useMemo(() => chefMap[chef?.uuid], [chef]);

  return (
    <Grid size={Styles.gridItemSize}>
      <Controller
        name="chef"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Tooltip
            arrow
            placement="right"
            title={
              chefModel && (
                <Box component="span">
                  <Typography>{`Email: ${chefModel?.email || ""}`}</Typography>
                  <Typography>{`Phone number: ${
                    chefModel?.phone || ""
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
                  helperText={error && "Chef is required"}
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
