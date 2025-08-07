import { Controller, useFormContext } from "react-hook-form";
import { type FC } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import Styles from "./chefItem.style";
import type { Chef as ChefModel } from "../../../../../../shared/types/chef.type";
import ChefTooltip from "./ChefTooltip";
import type { RecipeFormData } from "../../Recipe.type";

type ChefItemProps = {
  chefs: ChefModel[];
};

const ChefItem: FC<ChefItemProps> = ({ chefs }) => {
  const { control } = useFormContext<RecipeFormData>();

  return (
    <Grid size={Styles.gridItemSize}>
      <Controller
        name="chef"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <ChefTooltip chef={value}>
            <Autocomplete
              options={chefs}
              getOptionLabel={(chef) =>
                chef?.uuid ? `${chef?.firstName} ${chef?.lastName}` : ""
              }
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
          </ChefTooltip>
        )}
      />
    </Grid>
  );
};

export default ChefItem;
