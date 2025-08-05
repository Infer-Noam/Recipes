import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import type { ChefDetails } from "@shared/types/chef.type";
import { type FC } from "react";
import Styles from "./chefTableRow.style";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefDetailsSchema } from "../../../../../shared/validation/chefDetailsSchema.validation";
import { z } from "zod";
import type { ChefTableRowProps } from "./chefTableRowProps.type";

const ChefTableRow: FC<ChefTableRowProps> = ({
  chef,
  saveChef,
  deleteChef,
}) => {
  type ChefFormData = z.infer<typeof ChefDetailsSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ChefFormData>({
    defaultValues: chef,
    resolver: zodResolver(ChefDetailsSchema),
  });

  const onSubmit = (chef: ChefDetails) => {
    saveChef(chef);
  };

  return (
    <TableRow sx={Styles.chefTableRow}>
      <TableCell sx={Styles.centerAlign}>
        <IconButton onClick={deleteChef}>
          <RemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={Styles.firstNameTextField}
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName && "First name is required"}
            />
          )}
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={Styles.lastNameTextField}
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName && "Last name is required"}
            />
          )}
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={Styles.emailTextField}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email && "Valid email is required"}
            />
          )}
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={Styles.phoneTextField}
              variant="outlined"
              error={!!errors.phone}
              helperText={errors.phone && "Valid phone is required"}
            />
          )}
        />
      </TableCell>

      <TableCell>
        <IconButton onClick={() => handleSubmit(onSubmit)()} disabled={isDirty}>
          <CheckIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ChefTableRow;
