import { IconButton, TableCell, TableRow } from "@mui/material";
import type { ChefDetails } from "@shared/types/chef.type";
import { Fragment, type FC } from "react";
import Styles from "./chefTableRow.style";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefDetailsSchema } from "@shared/validation/chefDetailsSchema.validation";
import type { ChefFormData, ChefTableRowProps } from "./chefTableRow.type";
import ControlledTextField from "../../../components/controlledTextField/ControlledTextField";
import { FormProvider, useForm } from "react-hook-form";
import useToggle from "../../../hooks/useToggle";
import DeleteChefDialog from "./DeleteChefDialog";

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

  const {
    open: deleteDialog,
    handleClose: closeDeleteDialog,
    handleOpen: openDeleteDialog,
  } = useToggle();

  const onSubmit = async (chef: ChefDetails) => {
    await saveChef(chef, {
      onSuccess: () => reset(chef),
    });
  };

  return (
    <Fragment>
      <FormProvider {...methods}>
        <TableRow sx={Styles.chefTableRow}>
          <TableCell sx={Styles.centerAlign}>
            <IconButton onClick={openDeleteDialog}>
              <RemoveIcon />
            </IconButton>
          </TableCell>
          <TableCell sx={Styles.centerAlign}>
            <ControlledTextField
              name="firstName"
              sx={Styles.firstNameTextField}
              slotProps={Styles.nameSlotProps}
            />
          </TableCell>
          <TableCell sx={Styles.centerAlign}>
            <ControlledTextField
              name="lastName"
              sx={Styles.lastNameTextField}
              slotProps={Styles.nameSlotProps}
            />
          </TableCell>
          <TableCell sx={Styles.centerAlign}>
            <ControlledTextField name="email" sx={Styles.emailTextField} />
          </TableCell>
          <TableCell sx={Styles.centerAlign}>
            <ControlledTextField
              name="phone"
              sx={Styles.phoneTextField}
              slotProps={Styles.phoneSlotProps}
            />
          </TableCell>
          <TableCell>
            <IconButton onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
              {chef.uuid ? <CheckIcon /> : <AddIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
      </FormProvider>
      <DeleteChefDialog
        deleteDialog={deleteDialog}
        closeDeleteDialog={closeDeleteDialog}
        deleteChef={deleteChef}
      />
    </Fragment>
  );
};

export default ChefTableRow;
