import { useDeleteChef } from "../../hooks/api/useDeleteChef.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { useSaveChef } from "../../hooks/api/useSaveChef.api";
import ChefTable from "../../components/chefTable/chefTable";
import type { FC } from "react";
import CentralErrorAlert from "src/components/centralErrorAlert/CentralErrorAlert";

const ChefPage: FC = () => {
  const { data: chefs } = useGetChefs();
  const { mutate: deleteChef } = useDeleteChef();
  const { mutateAsync: saveChef } = useSaveChef();

  if (chefs) {
    return (
      <ChefTable chefs={chefs} deleteChef={deleteChef} saveChef={saveChef} />
    );
  }

  return <CentralErrorAlert text="Something went wrong..." />;
};

export default ChefPage;
