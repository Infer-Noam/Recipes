import { IconButton, TableCell, TableRow } from "@mui/material";
import type { ChefDetails } from "@shared/types/chef.type";
import { type FC } from "react";
import Styles from "./chefTableRow.style";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefDetailsSchema } from "@shared/validation/chefDetailsSchema.validation";
import type { ChefFormData, ChefTableRowProps } from "./chefTableRow.type";
import ControlledTextField from "../../../components/controlledTextField/ControlledTextField";
import { FormProvider, useForm } from "react-hook-form";
import { useSwal } from "../../../hooks/useSwal";
import { getInputValidator as getInputValidator } from "./chefTableRow.util";
import { LETTERS_REGEX, NUMBER_REGEX } from "@shared/consts/regex.const";
import { DELETE_CHEF_WARNING_TEXT } from "./chefTableRow.const";

const ChefTableRow: FC<ChefTableRowProps> = ({
  chef,
  saveChef,
  deleteChef,
}) => {
  const methods = useForm<ChefFormData>({
    defaultValues: chef,
    resolver: zodResolver(ChefDetailsSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  const { showWarning } = useSwal();

  const onSubmit = async (chef: ChefDetails) => {
    await saveChef(chef, {
      onSuccess: () => reset(chef),
    });
  };

  return (
    <FormProvider {...methods}>
      <TableRow sx={Styles.chefTableRow}>
        <TableCell sx={Styles.centerAlign}>
          <IconButton
            onClick={() =>
              chef.uuid
                ? showWarning(DELETE_CHEF_WARNING_TEXT, {
                    dangerMode: true,
                    buttons: ["No", "Yes"],
                  }).then((willDelete) => willDelete && deleteChef())
                : deleteChef()
            }
          >
            <RemoveIcon />
          </IconButton>
        </TableCell>
        <TableCell sx={Styles.centerAlign}>
          <ControlledTextField
            name="firstName"
            sx={Styles.firstNameTextField}
            slotProps={{
              input: {
                inputProps: {
                  onInput: getInputValidator(LETTERS_REGEX),
                },
              },
            }}
          />
        </TableCell>
        <TableCell sx={Styles.centerAlign}>
          <ControlledTextField
            name="lastName"
            sx={Styles.lastNameTextField}
            slotProps={{
              input: {
                inputProps: {
                  onInput: getInputValidator(LETTERS_REGEX),
                },
              },
            }}
          />
        </TableCell>
        <TableCell sx={Styles.centerAlign}>
          <ControlledTextField name="email" sx={Styles.emailTextField} />
        </TableCell>
        <TableCell sx={Styles.centerAlign}>
          <ControlledTextField
            name="phone"
            sx={Styles.phoneTextField}
            slotProps={{
              input: {
                inputProps: {
                  maxLength: 10,
                  onInput: getInputValidator(NUMBER_REGEX),
                },
              },
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
            {chef.uuid ? <CheckIcon /> : <AddIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </FormProvider>
  );
};

export default ChefTableRow;
