import type { FormEvent } from "react";

export const getInputValidator =
  (regex: RegExp) => (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(regex, "");
  };
