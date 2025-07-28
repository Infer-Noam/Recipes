import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import type { ChefDetails } from "@shared/types/chef.type";
import { useEffect, useState, type FC } from "react";
import Styles from "./chefTableRow.style";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ChefTableRowProps = {
  chef: ChefDetails;
  saveChef: (chef: ChefDetails) => void;
  deleteChef: () => void;
};

const ChefTableRow: FC<ChefTableRowProps> = ({
  chef: {
    uuid,
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
    phone: initialPhone,
  },
  saveChef,
  deleteChef,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
      phone: initialPhone,
    },
  });

  const allValues = watch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    saveChef({
      uuid,
      ...data,
    });
  };

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const changed =
      allValues.firstName !== initialFirstName ||
      allValues.lastName !== initialLastName ||
      allValues.email !== initialEmail ||
      allValues.phone !== initialPhone;
    setHasChanged(changed);
  }, [
    allValues,
    initialFirstName,
    initialLastName,
    initialEmail,
    initialPhone,
  ]);

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <TableRow sx={Styles.chefTableRow}>
      <TableCell sx={Styles.centerAlign}>
        <IconButton onClick={deleteChef}>
          <RemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <TextField
          sx={Styles.firstNameTextField}
          variant="outlined"
          {...register("firstName", { required: true, maxLength: 20 })}
          error={!!errors.firstName}
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <TextField
          sx={Styles.lastNameTextField}
          variant="outlined"
          {...register("lastName", { required: true, maxLength: 20 })}
          error={!!errors.lastName}
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <TextField
          sx={Styles.emailTextField}
          variant="outlined"
          {...register("email", {
            required: true,
            pattern: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
          })}
          error={!!errors.email}
        />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <TextField
          sx={Styles.phoneTextField}
          {...register("phone", {
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]{10}$/,
          })}
          variant="outlined"
          error={!!errors.phone}
        />
      </TableCell>

      <TableCell>
        {hasChanged && (
          <IconButton onClick={handleSave}>
            <CheckIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ChefTableRow;
