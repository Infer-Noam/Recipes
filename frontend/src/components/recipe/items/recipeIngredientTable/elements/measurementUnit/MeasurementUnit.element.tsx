import { MenuItem, Select } from "@mui/material";
import type { FC } from "react";
import Styles from "./measurementUnit.style";
import type { RecipeFormData } from "../../../../Recipe.type";
import { MeasurementUnit } from "../../../../../../../../shared/enums/measurement-unit.enum";

type MeasurementUnitElementProps = {
  recipeIngredient: RecipeFormData["ingredients"][number];
  setMeasurementUnit: (measurementUnit: MeasurementUnit, uuid?: string) => void;
  error: any;
};

const MeasurementUnitElement: FC<MeasurementUnitElementProps> = ({
  recipeIngredient,
  setMeasurementUnit,
  error,
}) => {
  return (
    <Select
      sx={Styles.measurementUnitSelect}
      value={recipeIngredient.measurementUnit}
      onChange={(e) => {
        setMeasurementUnit(e.target.value, recipeIngredient.uuid);
      }}
      error={!!error}
    >
      {Object.values(MeasurementUnit).map((measurementUnit, index) => (
        <MenuItem key={index} value={measurementUnit}>
          {measurementUnit}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MeasurementUnitElement;
