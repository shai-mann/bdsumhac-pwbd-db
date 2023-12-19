import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, DialogContentText } from "@mui/material";
import { pink } from "@mui/material/colors";
import Facility from "../../models/Facility";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface FacilityModalProps {
  facility: Facility;
  open: boolean;
  closeCallback: () => void;
}

const FacilityModal: React.FC<FacilityModalProps> = ({
  facility: f,
  open: initOpen,
  closeCallback,
}) => {
  const [open, setOpen] = React.useState(initOpen);

  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {f.name1} {f.name2}
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <DialogContentText>
          {f.street1}
          {f.street2 ? `, ${f.street2}` : ""}
          {`, ${f.city}, ${f.state}, ${f.zip}`}
          {f.zip4 ? `-${f.zip4}` : ""}
        </DialogContentText>
        <DialogContentText>
          Accepts People With Bleeding Disorders? (PWBD)
        </DialogContentText>
        <Checkbox
          value={!!f.pwbd}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        ></Checkbox>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default FacilityModal;
