import type { UseFieldArrayMove, UseFieldArrayRemove } from "react-hook-form";

export type StepsListItemProps = {
  index: number;
  remove: UseFieldArrayRemove;
  move: UseFieldArrayMove;
  stepsSize: number;
};
