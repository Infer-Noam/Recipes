import { Box, Typography } from "@mui/material";
import { useDeleteChef } from "../../hooks/api/useDeleteChef.api";
import { useGetChefs } from "../../hooks/api/useGetChefs.api";
import { useSaveChef } from "../../hooks/api/useSaveChef.api";
import type { FC } from "react";

const ChefPage: FC = () => {
  const { data: chefs } = useGetChefs();
  const { mutate: deleteChef } = useDeleteChef();
  const { mutateAsync: saveChef } = useSaveChef();

  if (chefs) {
    return <Box>{chefs.map((c) => JSON.stringify(c))}</Box>;
  } else return null;
};

export default ChefPage;
