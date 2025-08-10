import { useMemo } from "react";
import type { RecipeStepFormData } from "./stepItem.type";

export const useSortedSteps = (steps: RecipeStepFormData[]) =>
  useMemo(
    () => steps?.slice().sort((a, b) => a.placement - b.placement),
    [steps]
  );
