import { Alert, AlertTitle, Box } from "@mui/material";
import { useDeleteChef } from "../../hooks/api/useDeleteChef.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { useSaveChef } from "../../hooks/api/useSaveChef.api";
import ChefTable from "../../components/chefTable/chefTable";
import Styles from "./chefPage.style";
import { useState } from "react";
import { isAxiosError } from "axios";
import type { ChefDetails } from "@shared/types/chef.type";

const ChefPage = () => {
  const { data: chefs } = useGetChefs();
  const { mutateAsync: deleteChefMutate } = useDeleteChef();
  const { mutateAsync: saveChefMutate, error } = useSaveChef();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isError, setIsError] = useState<boolean | undefined>(undefined);

  const deleteChef = async (uuid: string) => {
    setMessage(undefined);
    await deleteChefMutate(uuid)
      .then((response) => {
        setMessage(response.message);
        setIsError(false);
      })
      .catch((err) => {
        if (isAxiosError(err)) setMessage(err.response?.data.message);
        else setMessage(error?.message);
        setIsError(true);
      });
  };

  const saveChef = async (chefDetails: ChefDetails) => {
    setMessage(undefined);
    const { firstName, lastName, phone, email } = chefDetails;

    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

    let errorMessage: string | undefined = undefined;

    if (firstName.length === 0) errorMessage = "First name is required";
    else if (lastName.length === 0) errorMessage = "Last name is required";
    else if (!emailRegex.test(email)) errorMessage = "Invalid email address";
    else if (phone.length !== 10) errorMessage = "Invalid phone number";

    if (errorMessage) {
      setMessage(errorMessage);
      setIsError(true);
      return;
    }

    await saveChefMutate(chefDetails)
      .then((response) => {
        setMessage(response.message);
        setIsError(false);
      })
      .catch((err) => {
        if (isAxiosError(err)) setMessage(err.response?.data.message);
        else setMessage(error?.message);
        setIsError(true);
      });
  };

  if (chefs) {
    return (
      <Box>
        <ChefTable chefs={chefs} deleteChef={deleteChef} saveChef={saveChef} />
        {message && (
          <Alert sx={Styles.alert} severity={isError ? "error" : "success"}>
            <AlertTitle>{isError ? "Error" : "Success"}</AlertTitle>
            {message}
          </Alert>
        )}
      </Box>
    );
  } else return null;
};

export default ChefPage;
