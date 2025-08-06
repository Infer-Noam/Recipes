import { IconButton, TableCell, TableRow } from "@mui/material";
import type { ChefDetails } from "../../../../../shared/types/chef.type";
import { type FC } from "react";
import Styles from "./chefTableRow.style";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefDetailsSchema } from "../../../../../shared/validation/chefDetailsSchema.validation";
import { z } from "zod";
import type { ChefTableRowProps } from "./chefTableRow.type";
import ControlledTextField from "../../../components/controlledTextField/ControlledTextField";

const ChefTableRow: FC<ChefTableRowProps> = ({
  chef,
  saveChef,
  deleteChef,
}) => {
  type ChefFormData = z.infer<typeof ChefDetailsSchema>;

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<ChefFormData>({
    defaultValues: chef,
    resolver: zodResolver(ChefDetailsSchema),
  });

  const onSubmit = (chef: ChefDetails) => {
    saveChef(chef);
    reset(chef);
  };

  return (
    <TableRow sx={Styles.chefTableRow}>
      <TableCell sx={Styles.centerAlign}>
        <IconButton onClick={deleteChef}>
          <RemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <ControlledTextField
          name="firstName"
          control={control}
          sx={Styles.firstNameTextField}
          variant="outlined"
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <ControlledTextField
          name="lastName"
          control={control}
          sx={Styles.lastNameTextField}
          variant="outlined"
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <ControlledTextField
          name="email"
          control={control}
          sx={Styles.emailTextField}
          variant="outlined"
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <ControlledTextField
          name="phone"
          control={control}
          sx={Styles.phoneTextField}
          variant="outlined"
        />
      </TableCell>

      <TableCell>
        <IconButton
          onClick={() => handleSubmit(onSubmit)()}
          disabled={!isDirty}
        >
          {chef.uuid ? <CheckIcon /> : <AddIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ChefTableRow;
