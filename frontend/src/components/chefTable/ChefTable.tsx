import type { ChefDetails } from "../../../../shared/types/chef.type";
import Styles from "./chefTable.style";
import { useEffect, useState, type FC } from "react";
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

type ChefTableProps = {
  chefs: ChefDetails[];
  saveChef: (chefDetails: ChefDetails) => void;
  deleteChef: (uuid: string) => void;
};

const ChefTable: FC<ChefTableProps> = ({
  chefs: defaultChefs,
  saveChef,
  deleteChef,
}) => {
  const [newChef, setNewChef] = useState<ChefDetails | undefined>(undefined);
  const [chefs, setChefs] = useState(defaultChefs);

  useEffect(() => {
    if (!newChef) {
      const existingUUIDs = chefs.map((c) => c.uuid);
      const newChefs = defaultChefs.filter(
        (c) => !existingUUIDs.includes(c.uuid)
      );
      setChefs((prev) => [...prev, ...newChefs]);
    }
  }, [newChef, defaultChefs]);

  const addNewChef = () => setNewChef(DEFAULT_CHEF_DETAILS);

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
          {chefs.map((chef) => (
            <ChefTableRow
              key={chef.uuid}
              chef={chef}
              deleteChef={() => {
                chef.uuid && deleteChef(chef.uuid);
                setChefs((prev) => prev.filter((p) => p.uuid !== chef.uuid));
              }}
              saveChef={saveChef}
            />
          ))}
          {newChef && (
            <ChefTableRow
              chef={newChef}
              deleteChef={() => setNewChef(undefined)}
              saveChef={(chefDetails) => {
                saveChef(chefDetails);
                setNewChef(undefined);
              }}
            />
          )}
          <TableRow>
            <TableCell sx={Styles.centerAlign}>
              <Button
                onClick={addNewChef}
                startIcon={<AddIcon />}
                disabled={!!newChef}
              >
                Add chef
              </Button>
            </TableCell>
            {Array.from({ length: Styles.CELL_COUNT }, (_, index) => (
              <TableCell key={index} />
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChefTable;
