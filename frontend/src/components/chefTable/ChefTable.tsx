import type { ChefDetails } from "@shared/types/chef.type";
import Styles from "./chefTable.style";
import { type FC } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ChefTableRow from "./chefTableRow/ChefTableRow";
import AddIcon from "@mui/icons-material/Add";
import { DEFAULT_CHEF_DETAILS } from "./defaultChefDetails.const";
import CustomTableCell from "../customTableCell/CustomTableCell";
import { CELL_COUNT } from "./chefTable.const";
import type { SaveChefRes } from "@shared/api/chef/saveChef.api";
import type { AxiosResponse } from "axios";
import useToggle from "../../hooks/useToggle";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type ChefTableProps = {
  chefs: ChefDetails[];
  saveChef: UseMutateAsyncFunction<
    AxiosResponse<SaveChefRes, any>,
    unknown,
    ChefDetails,
    unknown
  >;
  deleteChef: (uuid: string) => void;
};

const ChefTable: FC<ChefTableProps> = ({
  chefs: defaultChefs,
  saveChef,
  deleteChef,
}) => {
  const {
    open: newChef,
    handleOpen: createNewChef,
    handleClose: resetNewChef,
  } = useToggle();

  return (
    <TableContainer component={Paper}>
      <Table sx={Styles.container}>
        <TableHead>
          <TableRow>
            <CustomTableCell label="" />
            <CustomTableCell label="First name" />
            <CustomTableCell label="Last name" />
            <CustomTableCell label="Email" />
            <CustomTableCell label="Phone number" />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {defaultChefs.map((chef) => (
            <ChefTableRow
              key={chef.uuid}
              chef={chef}
              deleteChef={() => {
                chef.uuid && deleteChef(chef.uuid);
              }}
              saveChef={saveChef}
            />
          ))}
          {newChef && (
            <ChefTableRow
              chef={DEFAULT_CHEF_DETAILS}
              deleteChef={resetNewChef}
              saveChef={(chefDetails) =>
                saveChef(chefDetails, { onSuccess: resetNewChef })
              }
            />
          )}
          <TableRow>
            <TableCell sx={Styles.centerAlign}>
              <Button
                onClick={createNewChef}
                startIcon={<AddIcon />}
                disabled={!!newChef}
              >
                Add chef
              </Button>
            </TableCell>
            {Array.from({ length: CELL_COUNT }, (_, index) => (
              <TableCell key={index} />
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChefTable;
