import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainView from './MainView';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <SideBar />
      <MainView />
    </Box>
  );
}

export default App;
