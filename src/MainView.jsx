import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from './Table';

export default function MainView({ data }) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 20, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4">
        { data?.name }
        </Typography>
        { data?.data && <Table rows={data.data} />}
        { data?.properties && <Table rows={data.properties} />}
        { data?.propertyOwners && <Table rows={data.propertyOwners} />}
      </Box>
  );
}