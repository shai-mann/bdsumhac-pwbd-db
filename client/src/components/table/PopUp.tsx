import { Button } from "@mui/base";
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material";
import { FC } from "react";

interface PopUpProps {
    edits: number,
    show: boolean,
    closeModal: (submit: boolean) => void,
}

export const PopUp: FC<PopUpProps> = ({edits, show, closeModal}) => {
  return (
    <Dialog
      open={show}
      onClose={() => closeModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Submit Changes?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to make changes to {edits}{" "}
          facilities?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal(false)}>Cancel</Button>
        <Button onClick={() => closeModal(true)} autoFocus>
          Submit Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
