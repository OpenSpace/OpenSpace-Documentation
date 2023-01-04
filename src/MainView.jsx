import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from './Table';

export default function MainView({data}) {
  function renderArray(array) {
    if(array === null) {
      return null;
    }
    else if(Array.isArray(array)) {
      return array.map(item => renderArray(item));
    }
    else if(typeof array === "object") {
      return Object.keys(array).map(item => renderArray(data[item]));
    }
    else {
      return (
        <Typography key={array} paragraph>
          {array}
        </Typography>
      );
    }
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h3">
        {data?.name}
        {data?.library}
      </Typography>
      { data?.functions && <Table rows={data.functions} />}
    </Box>
  );
}