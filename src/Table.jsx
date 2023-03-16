import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function CellLink({onClick, row, name}) {
  return (
    <TableCell component="th" scope="row" >
      {onClick ?
        <Link
          component="button"
          variant="body2"
          onClick={() => onClick(row)}
        >
          {name}
        </Link>
        : <>{name}</>
      }
    </TableCell>
  );
}

function CopyUriButton({ uri }) {
  function color(theme) {
    return theme.palette.secondary[theme.palette.mode];
  }

  return (
      <Button
        component="button"
        variant="body2"
        onClick={() => navigator.clipboard.writeText(uri)}
        sx={{
          marginLeft: '10px',
          padding: '3px 10px', 
          backgroundColor: color,
        }}
      >
        {"Copy URI"}
      </Button>
  );
}
  
  
export default function BasicTable({ headers, rows, setSelectedItem, cellFunc }) {
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
          {rows.map((row) => (
            <>
              <TableRow
                key={row?.Name || row?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CellLink onClick={setSelectedItem} row={row} name={row?.Name ?? row?.id} />
                {headers.map((header) => {
                  if (header === 'name') {
                    return null;
                  }
                  if (header === 'URI') {
                    return (
                      <>
                        <TableCell>
                          <Box sx={{ display:'flex', alignItems: 'center' }}>
                            {row[header]}
                            <CopyUriButton uri={row.URI} />
                          </Box>
                        </TableCell>
                      </>
                    );
                  }
                  if (cellFunc && cellFunc.Name === header) {
                    return <CellLink onClick={cellFunc.Function} row={row} name={row[cellFunc.Name]} />;
                  }
                  return !Array.isArray(row[header]) && <TableCell>{row[header]}</TableCell>;
                })}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}