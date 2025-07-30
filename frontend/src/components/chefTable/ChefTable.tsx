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
  Typography,
} from "@mui/material";
import ChefTableRow from "./chefTableRow/ChefTableRow";
import AddIcon from "@mui/icons-material/Add";
import defaultChefDetails from "../../consts/defaultChefDetails";

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
  const [chefs, setChefs] = useState(defaultChefs);

  const CustomTableCell: FC<{ label: string }> = ({ label }) => (
    <TableCell sx={Styles.centerAlign}>
      <Typography variant="subtitle1" sx={Styles.labelTypography}>
        {label}
      </Typography>
    </TableCell>
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={Styles.container} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <CustomTableCell label={"First name"} />
            <CustomTableCell label={"Last name"} />
            <CustomTableCell label={"Email"} />
            <CustomTableCell label={"Phone number"} />
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
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChefTable;
