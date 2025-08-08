import { MenuItem, Select } from "@mui/material";
import type { FC } from "react";
import Styles from "./measurementUnitElement.style";
import type { RecipeFormData } from "../../../../Recipe.type";
import { MeasurementUnit } from "../../../../../../../../shared/enums/measurement-unit.enum";
import { Controller, useFormContext } from "react-hook-form";

type MeasurementUnitElementProps = {
  index: number;
};

const MeasurementUnitElement: FC<MeasurementUnitElementProps> = ({ index }) => {
  const { control } = useFormContext<RecipeFormData>();

  return (
    <Controller
      name={`ingredients.${index}.measurementUnit`}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          sx={Styles.measurementUnitSelect}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          error={!!error}
        >
          {Object.values(MeasurementUnit).map((measurementUnit, index) => (
            <MenuItem key={index} value={measurementUnit}>
              {measurementUnit}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default MeasurementUnitElement;
