import type { ChefDetails } from "@shared/types/chef.type";
import Styles from "./chefTable.style";
import { useState, type FC } from "react";
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
import ChefTableRow from "./chefTableRow/chefTableRow";
import AddIcon from "@mui/icons-material/Add";
import defaultChefDetails from "./defaultChefDetails.const";
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
  const cellCount = 5;
  const [chefs, setChefs] = useState(defaultChefs);

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
                deleteChef(chef.uuid);
                setChefs((prev) => prev.filter((p) => p.uuid !== chef.uuid));
              }}
              saveChef={saveChef}
            />
          ))}
          <TableRow>
            <TableCell sx={Styles.centerAlign}>
              <Button
                onClick={() => {
                  setChefs((prev) => [...prev, defaultChefDetails]);
                }}
                startIcon={<AddIcon />}
              >
                Add chef
              </Button>
            </TableCell>
            {Array.from({ length: cellCount }, (_, i) => (
              <TableCell key={i} />
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChefTable;
