import { FC } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Table as MaterialTable } from "@mui/material";
import Paper from "@mui/material/Paper";
import Facility from "../../models/Facility";

interface TableProps {
  facilities: Facility[];
}

const Table: FC<TableProps> = ({ facilities }) => {
  return (
    <TableContainer component={Paper}>
      <MaterialTable
        sx={{ minWidth: 700 }}
        size="small"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">PWBD?</TableCell>
            <TableCell align="right">Facility Name</TableCell>
            <TableCell align="right">Street Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Zip</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilities.map((f) => (
            <TableRow
              key={f._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {f.pwbd}
              </TableCell>
              <TableCell align="right">{f.name1}</TableCell>
              <TableCell align="right">
                {f.street1}
                {f.street2 ? `, ${f.street2}` : ""}
              </TableCell>
              <TableCell align="right">{f.city}</TableCell>
              <TableCell align="right">{f.state}</TableCell>
              <TableCell align="right">
                {f.zip}
                {f.zip4 ? `, ${f.zip4}` : ""}
              </TableCell>
              <TableCell align="right">{f.phone}</TableCell>
              <TableCell align="right">{f.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default Table;
