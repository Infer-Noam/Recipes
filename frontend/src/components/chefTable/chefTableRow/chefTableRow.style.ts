import type { SxProps } from "@mui/material";
import { LETTERS_REGEX, NUMBER_REGEX } from "@shared/consts/regex.const";

const chefTableRow: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const firstNameTextField: SxProps = {
  width: "100px",
};

const lastNameTextField: SxProps = { width: "100px" };

const emailTextField: SxProps = { width: "230px" };

const phoneTextField: SxProps = { width: "120px" };

const centerAlign: SxProps = {
  textAlign: "center",
  verticalAlign: "top",
};

const nameSlotProps = {
  input: {
    inputProps: {
      onInput: (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(
          LETTERS_REGEX,
          ""
        );
      },
    },
  },
};

const phoneSlotProps = {
  input: {
    inputProps: {
      maxLength: 10,
      onInput: (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(NUMBER_REGEX, "");
      },
    },
  },
};

export default {
  chefTableRow,
  firstNameTextField,
  lastNameTextField,
  emailTextField,
  phoneTextField,
  centerAlign,
  nameSlotProps,
  phoneSlotProps,
};
