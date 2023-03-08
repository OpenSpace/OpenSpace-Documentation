import React from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainView from './MainView';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { data } from "./documentationData.js";
import IconButton from '@mui/material/IconButton';
import { useColorMode } from './ColorModeContext';

function ToggleMode() {
  const theme = useTheme();
  const [mode, toggleMode] = useColorMode();
  const title = theme.palette.mode.charAt(0).toUpperCase() + theme.palette.mode.slice(1);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
        bgcolor: 'transparent',
      }}
    >
      {title} mode
      <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
function App() {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [breadcrumbs, setBreadcrumbs] = React.useState(null);
  const [searchText, setSearchText] = React.useState(null);
  const [mode, toggleMode] = useColorMode();

  function search(string) {
    setSelectedItem(data.documentation.filter(item => item.name.includes(string.target.value)));
  }

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                // Some CSS
                backgroundColor: mode === 'light' && '#06708f'
              }
            }
          }
        }
      }),
    [mode],
  );

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Box sx={{ display: "flex" }}>
          <Header
            search={search}
            searchText={searchText}
            setSearchText={setSearchText}
            data={data.documentation}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          >
            <ToggleMode />
          </Header>
          <SideBar data={data.documentation} setSelectedItem={setSelectedItem} setBreadcrumbs={setBreadcrumbs}/>
          <MainView data={selectedItem} setSelectedItem={setSelectedItem} />
        </Box>
      </ThemeProvider>
  );
}

export default App;
