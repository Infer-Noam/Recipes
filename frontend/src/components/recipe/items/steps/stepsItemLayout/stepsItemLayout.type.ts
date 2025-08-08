import type { FieldError } from "react-hook-form";

export type StepsItemLayoutProps = {
  steps: string[];
  updateSteps: (steps: string[]) => void;
  error: FieldError | undefined;
};
