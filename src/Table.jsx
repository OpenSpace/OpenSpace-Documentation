import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
  
export default function BasicTable({ headers, rows, setSelectedItem }) {
  const [open, setOpen] = React.useState(false);
  if (!(rows?.length && rows?.length > 0)) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{"Name"}</TableCell>
            {headers.map(title => <TableCell>{ title }</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (<>
            <TableRow
              key={row?.Name || row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {setSelectedItem ?
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setSelectedItem(row)}
                  >
                    { row?.Name || row?.id }
                  </Link>
                  : <>{ row?.Name || row?.id }</>
                }
              </TableCell>
              {headers.map((header) => {
                if (header === 'name') {
                  return null;
                }
                return !Array.isArray(row[header]) && <TableCell>{row[header]}</TableCell>
              })}
            </TableRow>
            </>
            ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}