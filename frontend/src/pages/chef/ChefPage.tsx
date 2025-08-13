import { useDeleteChef } from "../../hooks/api/useDeleteChef.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { useSaveChef } from "../../hooks/api/useSaveChef.api";
import ChefTable from "../../components/chefTable/ChefTable";
import { type FC } from "react";
import BackdropLoading from "../../components/backdropLoading/BackdropLoading";
import CentralErrorAlert from "../../components/centralErrorAlert/CentralErrorAlert";
import { useSwal } from "../../hooks/useSwal";
import { HTTP_STATUS_MESSAGES } from "./chefPage.const";

const ChefPage: FC = () => {
  const { data: chefs, isLoading } = useGetChefs();

  const { showError, showSuccess } = useSwal();

  const { mutateAsync: deleteChef } = useDeleteChef(showError, (data) => {
    showSuccess(data.message);
  });
  const { mutateAsync: saveChef } = useSaveChef(
    (err) => showError(err, undefined, HTTP_STATUS_MESSAGES),
    (data) => {
      showSuccess(data.message);
    }
  );

  if (isLoading) return <BackdropLoading />;

  if (!chefs) return <CentralErrorAlert text="Something went wrong..." />;

  return (
    <ChefTable chefs={chefs} deleteChef={deleteChef} saveChef={saveChef} />
  );
};

export default ChefPage;
