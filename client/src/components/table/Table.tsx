import { FC, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Checkbox,
  Link,
  Table as MaterialTable,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Facility from "../../models/Facility";
import { pink } from "@mui/material/colors";
import { updateFacilities } from "../../services/app-service";

interface TableProps {
  facilities: Facility[];
  highlightedFacility: Facility | null;
}

const Table: FC<TableProps> = ({ facilities, highlightedFacility }) => {
  const [editedFacilities, setEditedFacilities] = useState<[String, Boolean][]>(
    []
  );
  const [email, setEmail] = useState("");

  const onChange = (checked: boolean, f: Facility) => {
    const existingF = facilities.find((f1) => f1._id === f._id);
    if (existingF?.pwbd === checked) {
      setEditedFacilities(editedFacilities.filter((f1) => f1[0] !== f._id)); // remove edit
    } else {
      setEditedFacilities(editedFacilities.concat([[f._id, checked]])); // add edit
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFacilities(email, editedFacilities);
    // update facilities to reflect edits
    for (let [id, pwbd] of editedFacilities) {
      const f = facilities.find((f) => f._id === id);
      if (f) {
        f.pwbd = pwbd as boolean;
      }
    }
    setEditedFacilities([]);
  };

  const createFacility = (f: Facility, highlight = false) => {
    return (
      <TableRow
        key={f._id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          backgroundColor: highlight ? "#ffff0059" : "white",
        }}
      >
        <TableCell>
          <Checkbox
            checked={!!f.pwbd}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            onChange={(e) => onChange(e.target.checked, f)}
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
            <Button variant="contained" color="error" type="submit">
              Update {editedFacilities.length} Facilities
            </Button>
          </form>
        </div>
      )}
      <TableContainer component={Paper}>
        <MaterialTable
          sx={{ minWidth: 700 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>PWBD?</TableCell>
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
