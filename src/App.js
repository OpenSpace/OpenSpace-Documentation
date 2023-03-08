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
import useMediaQuery from '@mui/material/useMediaQuery';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function ToggleMode() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
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
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
function App() {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [breadcrumbs, setBreadcrumbs] = React.useState(null);
  const [searchText, setSearchText] = React.useState(null);
  const [mode, setMode] = React.useState('dark');
  const initialMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true }) ? 'dark' : 'light';

  React.useEffect(() => {
    setMode(initialMode);
  }, []); 
  
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

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

  function search(string) {
    setSelectedItem(data.documentation.filter(item => item.name.includes(string.target.value)));
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
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
    </ColorModeContext.Provider>
  );
}

export default App;
