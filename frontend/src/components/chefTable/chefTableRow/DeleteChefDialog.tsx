import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import type { FC } from "react";

type DeleteChefDialogProps = {
  deleteDialog: boolean;
  closeDeleteDialog: () => void;
  deleteChef: () => void;
};

const DeleteChefDialog: FC<DeleteChefDialogProps> = ({
  deleteDialog,
  closeDeleteDialog,
  deleteChef,
}) => (
  <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
    <DialogTitle>{"Are you sure?"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Deleting this chef will permanently remove all recipes associated with
        them. This action cannot be undone. Are you sure you want to proceed?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDeleteDialog}>NO</Button>
      <Button
        onClick={() => {
          closeDeleteDialog();
          deleteChef();
        }}
        autoFocus
      >
        YES
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteChefDialog;
