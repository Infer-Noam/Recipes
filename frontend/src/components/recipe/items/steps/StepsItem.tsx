import { Grid } from "@mui/material";
import type { FC } from "react";
import Styles from "./stepsItem.style";
import { Controller, useFormContext } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import StepsItemLayout from "./stepsItemLayout/StepsItemLayout";

const StepsItem: FC = () => {
  const { control } = useFormContext<RecipeFormData>();

  return (
    <Grid size={Styles.gridItemSize}>
      <Controller
        name="steps"
        control={control}
        render={({
          field: { value: steps, onChange },
          fieldState: { error },
        }) => (
          <StepsItemLayout steps={steps} updateSteps={onChange} error={error} />
        )}
      />
    </Grid>
  );
};

export default StepsItem;
