import { FC, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Link, Table as MaterialTable, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Facility from "../../models/Facility";
import { updateFacilities } from "../../services/app-service";
import { Dropdown } from "primereact/dropdown";
import { PWBD_DROPDOWN_OPTIONS } from "../Home";
import { PopUp } from "./PopUp";

interface TableProps {
  facilities: Facility[];
  highlightedFacility: Facility | null;
}

const Table: FC<TableProps> = ({ facilities, highlightedFacility }) => {
  const [editedFacilities, setEditedFacilities] = useState<[String, String][]>(
    []
  ); // [id, newPWBDValue]
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onChange = (update: string, f: Facility) => {
    const existingF = facilities.find((f1) => f1._id === f._id);
    if (existingF?.pwbd === update) {
      setEditedFacilities(editedFacilities.filter((f1) => f1[0] !== f._id)); // remove edit
    } else {
      setEditedFacilities(editedFacilities.concat([[f._id, update]])); // add edit
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = (submit: boolean) => {
    if (submit) {
      sendEdits();
    }

    setShowModal(false);
  };

  const sendEdits = async () => {
    await updateFacilities(email, editedFacilities);
    // update facilities to reflect edits
    for (let [id, pwbd] of editedFacilities) {
      const f = facilities.find((f) => f._id === id);
      if (f) {
        f.pwbd = pwbd as string;
      }
    }
    setEditedFacilities([]);
  };

  const createFacility = (f: Facility, highlight = false) => {
    let pwbd = f.pwbd;
    const edit = editedFacilities.find((f1) => f1[0] === f._id);
    if (edit) {
      pwbd = edit[1] as string; // if edits were made, display edit instead of original
    }

    return (
      <TableRow
        key={f._id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          backgroundColor: highlight ? "#ffff0059" : "white",
        }}
      >
        <TableCell>
          <Dropdown
            value={PWBD_DROPDOWN_OPTIONS.find((o) => o.value === pwbd)?.value}
            onChange={(e) => onChange(e.target.value, f)}
            options={PWBD_DROPDOWN_OPTIONS}
            optionLabel="label"
          />
        </TableCell>
        <TableCell>{f.name1}</TableCell>
        <TableCell>
          {f.street1}
          {f.street2 ? `, ${f.street2}` : ""}
          {`, ${f.city}, ${f.state}, ${f.zip}`}
          {f.zip4 ? `-${f.zip4}` : ""}
        </TableCell>
        <TableCell>{f.phone}</TableCell>
        <TableCell>
          <Link href={f.website} variant="body2" underline="hover">
            link
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      {editedFacilities.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}
        >
          <PopUp
            edits={editedFacilities.length}
            show={showModal}
            closeModal={closeModal}
          />
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "baseline", gap: 20 }}
          >
            <TextField
              label="Email"
              type="email"
              color="secondary"
              placeholder="Enter an Email"
              helperText="We associate edits with emails to keep history of database edits made."
              onChange={(e) => setEmail(e.target.value)}
              margin="dense"
              size="small"
              required
            />
            <Button
              variant="contained"
              color="error"
              type="submit"
              disabled={email.length === 0}
            >
              Save {editedFacilities.length} Change
              {editedFacilities.length > 1 && "s"}
            </Button>
          </form>
        </div>
      )}
      <TableContainer component={Paper}>
        <MaterialTable sx={{ minWidth: 700 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Accepts blood disorders</TableCell>
              <TableCell>Facility Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {highlightedFacility && createFacility(highlightedFacility, true)}
            {facilities
              .filter((f) => f._id !== highlightedFacility?._id)
              .map((f) => createFacility(f))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </>
  );
};

export default Table;
