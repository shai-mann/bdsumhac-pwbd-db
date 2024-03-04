import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useState } from "react";

interface PopUpProps {
  edits: number;
  show: boolean;
  onSubmit: (name?: string, explanation?: string) => void;
  onCancel: () => void;
}

export const PopUp: FC<PopUpProps> = ({ edits, show, onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSubmit = () => {
    onSubmit(name ? name : undefined, explanation ? explanation : undefined);
  };

  return (
    <Dialog open={show} onClose={onCancel}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Submit Changes?</Box>
          <Box>
            <IconButton onClick={onCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to make changes to {edits} facilities?
        </DialogContentText>
        <TextField
          label="Name (Optional)"
          type="name"
          color="secondary"
          placeholder="Enter a name"
          helperText="It can help us understand who is making edits if the edits are linked to a name."
          onChange={(e) => setName(e.target.value)}
          margin="dense"
          size="small"
          required
        />
        <TextField
          label="Reason (Optional)"
          type="reason"
          color="secondary"
          placeholder="Explain further why you know the edits are correct."
          helperText="Providing a reason for your edit allows us to understand where you got the information."
          onChange={(e) => setExplanation(e.target.value)}
          margin="dense"
          size="small"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus variant="contained">
          Submit Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
