import type { FormEvent } from "react";

export const getOnInput =
  (regex: RegExp) => (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(regex, "");
  };
