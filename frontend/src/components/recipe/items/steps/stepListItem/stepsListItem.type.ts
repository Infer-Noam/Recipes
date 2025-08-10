import type { UseFieldArrayRemove } from "react-hook-form";
import type { RecipeStepFormData } from "../stepItem.type";

export type StepsListItemProps = {
  step: RecipeStepFormData;
  remove: UseFieldArrayRemove;
};
