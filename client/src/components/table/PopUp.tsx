import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FC } from "react";

interface PopUpProps {
  edits: number;
  show: boolean;
  closeModal: (submit: boolean) => void;
}

export const PopUp: FC<PopUpProps> = ({ edits, show, closeModal }) => {
  return (
    <Dialog open={show} onClose={() => closeModal(false)}>
      <DialogTitle>Submit Changes?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to make changes to {edits} facilities?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal(false)} variant="outlined">Cancel</Button>
        <Button onClick={() => closeModal(true)} autoFocus variant="contained">
          Submit Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
