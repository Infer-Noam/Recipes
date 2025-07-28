import { Alert, AlertTitle, Box } from "@mui/material";
import { useDeleteChef } from "../../hooks/api/useDeleteChef.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { useSaveChef } from "../../hooks/api/useSaveChef.api";
import ChefTable from "../../components/chefTable/chefTable";
import Styles from "./chefPage.style";
import { useState, type FC } from "react";
import { isAxiosError } from "axios";

const ChefPage: FC = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { data: chefs } = useGetChefs();
  const { mutate: deleteChef } = useDeleteChef();
  const { mutateAsync: saveChef, isError } = useSaveChef(
    (err) => {
      if (isAxiosError(err)) setMessage(err.response?.data.message);
      else setMessage("Something went wrong");
    },
    (data) => setMessage(data.message)
  );

  if (chefs) {
    return (
      <Box>
        <ChefTable
          chefs={chefs}
          deleteChef={(uuid) => {
            deleteChef(uuid);
            setMessage(undefined);
          }}
          saveChef={saveChef}
        />
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
