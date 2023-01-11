import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from './Table';

function FunctionTable({functions, setSelectedItem}) {
  return (
    <Table headers={["Function Name", "Description"]} rows={functions} setSelectedItem={setSelectedItem} />
  );
}

export default function MainView({ data, setSelectedItem }) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 20, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4">
        { data?.name }
        </Typography>
        { data?.functions && <FunctionTable functions={data.functions} setSelectedItem={setSelectedItem}/>}
      </Box>
  );
}