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

function CellLink({onClick, row, name, style}) {
  return (
    <TableCell component="th" scope="row" >
      {onClick ?
        <Link
          component="button"
          variant="body2"
          onClick={() => onClick(row)}
          sx={{ textAlign: 'left', ...style }}
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

function CellContent({ row, header, cellFunc, greyColor }) {
  const key = `${row["name"]}${row[header]}`;
  if (header === 'name') {
    return null;
  }
  if (header === 'uri') {
    return (
      <>
        <TableCell key={key}>
          <Box sx={{ display:'flex', alignItems: 'center' }}>
            <p style={{ overflowWrap: 'anywhere' }}>{row[header]}</p>
            <CopyUriButton uri={row.uri} />
          </Box>
        </TableCell>
      </>
    );
  }
  if (cellFunc && cellFunc.name === header) {
    if (header === 'url') {
      return <CellLink key={key} onClick={cellFunc.Function} row={row} name={row[cellFunc.name]} style={{overflowWrap: 'anywhere'}} />;
    }
    return <CellLink key={key} onClick={cellFunc.Function} row={row} name={row[cellFunc.name]} />;
  }
  if (typeof row[header] === 'boolean') {
      const text = row[header] ? 'Yes' : 'No';
      return (
        <Box
          key={key}
          sx={{
            backgroundColor: text === 'No' && greyColor,
            padding: '5px 0px',
            borderRadius: '5px',
            textAlign: 'center'
          }}
        >
        {text}
      </Box>
      );
    }
  if (!Array.isArray(row[header])) {
    return <TableCell key={key} sx={{ overflowWrap: 'anywhere' }}>{row[header]}</TableCell>
  }
}

export default function BasicTable({ headers, rows, setSelectedItem, cellFunc }) {
  if (!(rows?.length && rows?.length > 0)) {
    return null;
  }

  function greyColor(theme) {
    return theme.palette.mode === 'dark' ? theme.palette.grey['A700'] : theme.palette.grey['300'] ;
  };

  function makeReadableText(text) {
    // Make first letter capitalized
    const capitalized = `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    // Split CamelCase word into array where the uppercase letters are
    const words = capitalized.split(/(?=[A-Z])/);
    return words.join(' ');
  }

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: greyColor }}>
            <TableCell>{"Name"}</TableCell>
            {headers.map(title => <TableCell key={title}>{ makeReadableText(title) }</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <React.Fragment key={`fragment${row?.id || row?.name}`}>
              <TableRow
                key={`row${row?.id || row?.name}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              >
                <CellLink key={`rowlink${row?.name}`} onClick={setSelectedItem} row={row} name={row?.name ?? row?.id} />
                {headers.map((header) => (
                  <CellContent
                    key={`content${header}${row[header] || row?.id}`}
                    row={row}
                    header={header}
                    cellFunc={cellFunc}
                    greyColor={greyColor}
                  />
                ))}
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}