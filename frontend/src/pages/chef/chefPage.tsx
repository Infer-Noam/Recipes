import { Alert, AlertTitle, Box } from "@mui/material";
import { useDeleteChef } from "../../hooks/api/useDeleteChef.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { useSaveChef } from "../../hooks/api/useSaveChef.api";
import ChefTable from "../../components/chefTable/chefTable";
import Styles from "./chefPage.style";
import { useState } from "react";
import { isAxiosError } from "axios";
import type { FC } from "react";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";
import type { DeleteChefRes } from "../../../../shared/http-types/chef/deleteChef.http-type";
import type { SaveChefRes } from "../../../../shared/http-types/chef/saveChef.http-type";

const ChefPage: FC = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>(false);

  const { data: chefs } = useGetChefs();

  const onError = (err: unknown) => {
    const defaultMessage = "Something went wrong";
    if (isAxiosError(err))
      setMessage(err.response?.data?.message || defaultMessage);
    else setMessage(defaultMessage);
    setIsError(true);
  };

  const onSuccess = (data: DeleteChefRes | SaveChefRes) => {
    setMessage(data.message);
    setIsError(false);
  };

  const { mutateAsync: deleteChef } = useDeleteChef(onError, onSuccess);
  const { mutateAsync: saveChef } = useSaveChef(onError, onSuccess);

  type AlertInfo = {
    severity: "success" | "error";
    title: "Success" | "Error";
  };

  const errorAlert: Record<"success" | "error", AlertInfo> = {
    error: {
      severity: "error",
      title: "Error",
    },
    success: {
      severity: "success",
      title: "Success",
    },
  };

  const alert = isError ? errorAlert.error : errorAlert.success;

  if (!chefs) return <CentralErrorAlert text="Something went wrong..." />;

  return (
    <Box>
      <ChefTable chefs={chefs} deleteChef={deleteChef} saveChef={saveChef} />
      {message && (
        <Alert sx={Styles.alert} severity={alert.severity}>
          <AlertTitle>{alert.title}</AlertTitle>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default ChefPage;
