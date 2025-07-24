import type { ChefDetails } from "@shared/types/chef.type";
import Styles from "./chefTable.style";
import { useState, type FC } from "react";
import {
  Alert,
  AlertTitle,
  Box,
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
import ChefTableRow from "./chefTableRow/chefTableRow";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import type { SaveChefRes } from "@shared/http-types/chef/saveChef.http-type";

type ChefTableProps = {
  chefs: ChefDetails[];
  saveChef: (chefDetails: ChefDetails) => Promise<SaveChefRes>;
  deleteChef: (uuid: string) => void;
};

const ChefTable: FC<ChefTableProps> = ({
  chefs: defaultChefs,
  saveChef,
  deleteChef,
}) => {
  const [chefs, setChefs] = useState(defaultChefs);
  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  const isValidChef = (chef: ChefDetails): boolean => {
    if (typeof chef.firstName !== "string") return false;
    if (typeof chef.lastName !== "string") return false;
    if (typeof chef.email !== "string") return false;
    if (typeof chef.phone !== "string") return false;
    return true;
  };

  const save = async (chef: ChefDetails) => {
    setErrorText(undefined);
    const isChefValid = isValidChef(chef);
    if (isChefValid) {
      const response = await saveChef(chef);
      response.error && setErrorText(response.error?.message);
    } else {
      setErrorText("Chef contain invalid fields");
    }
  };

  const CustomTableCell: FC<{ label: string }> = ({ label }) => (
    <TableCell align="center">
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
    </TableCell>
  );
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={Styles.container} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableCell label={""} />
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
                saveChef={save}
              />
            ))}
            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    const newChef: ChefDetails = {
                      uuid: uuidv4(),
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                    };
                    setChefs((prev) => [...prev, newChef]);
                  }}
                  startIcon={<AddIcon />}
                >
                  Add chef
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {errorText && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorText}
        </Alert>
      )}
    </Box>
  );
};

export default ChefTable;
