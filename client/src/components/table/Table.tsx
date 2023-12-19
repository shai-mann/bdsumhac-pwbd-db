import { FC } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox, Link, Table as MaterialTable } from "@mui/material";
import Paper from "@mui/material/Paper";
import Facility from "../../models/Facility";
import { pink } from "@mui/material/colors";

interface TableProps {
  facilities: Facility[];
  highlightedFacility: Facility | null
}

const Table: FC<TableProps> = ({ facilities, highlightedFacility }) => {

  const createFacility = (f: Facility, highlight = false) => {
    return (<TableRow
      key={f._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 }, backgroundColor: highlight ? "#ffff0059" : "white" }}
    >
      <TableCell>
        <Checkbox
          value={!!f.pwbd}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
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
    </TableRow>)
  }

  return (
    <TableContainer component={Paper}>
      <MaterialTable
        sx={{ minWidth: 700 }}
        size="small"
        aria-label="simple table"
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
          {facilities.map((f) => {
            if (f !== highlightedFacility) {
              return createFacility(f)
            } else {
              return <></>
            }
          })}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default Table;
