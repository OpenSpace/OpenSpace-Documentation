import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainView from './MainView';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useColorMode } from './ColorModeContext';

let data = window.data ? window.data : { "documentation" : []};

const HeaderColor = '#3d3d3d';

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
  const [breadcrumbs, setBreadcrumbs] = React.useState([]);
  const [searchText, setSearchText] = React.useState(null);
  const [mode, toggleMode] = useColorMode();

  function select(data, parents) {
    setBreadcrumbs(parents);
    setSelectedItem(data);
  }

  function selectBreadcrumb(crumbs) {
    if (!crumbs) {
      setBreadcrumbs([]);
      return;
    }
    let found = undefined;
    crumbs.forEach(crumb => {
      if (!found) {
        found = data.documentation;
      }
      if (Array.isArray(found)) {
        found = found.find(element => (element.name === crumb || element?.fullName === crumb));
      }
      else if (typeof found === 'object') {
        Object.values(found).forEach(value => {
          if (Array.isArray(value)) {
            found = value.find(element => (element.name === crumb || element?.fullName === crumb));
          }
        })
      }
    });
    setSelectedItem(found);
    setBreadcrumbs(crumbs);
  }

  function search(searchResults, parents, documentationData, string = searchText) {
    if (!string) return;
    if (Array.isArray(documentationData)) {
      documentationData.map(item => search(searchResults, [...parents, item.name], item, string));
    }
    else if (typeof documentationData === 'object') {
      const found = documentationData?.name?.toLowerCase().includes(string.toLowerCase());
      if (found) {
        searchResults.push({ data: documentationData, crumbs: parents });
      }
      Object.values(documentationData).map(nestedData => {
        if (Array.isArray(nestedData)) {
          nestedData.map(item => search(searchResults, [...parents, item.name], item, string))
        } 
        else {
          search(searchResults, [...parents, nestedData.name], nestedData, string)
        }
      });
    }
  }

  function searchSelectedItem() {
    if (!selectedItem) {
      return [];
    }
    let results = [];
    search(results, breadcrumbs, selectedItem);
    return results;
  }

  function searchDocumentation() {
    let results = [];
    search(results, [], data.documentation);
    return results;
  }

  function searchAssetTypes(string) {
    let results = [];
    const assets = data.documentation.find(item => item.name === "Asset Types");
    search(results, ["Asset Types"], assets, string);
    return results[0];
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
                backgroundColor: mode === 'light' && HeaderColor
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
          setSearchText={setSearchText}
          setSelectedItem={select}
          searchSelectedItem={searchSelectedItem}
          searchDocumentation={searchDocumentation}
        >
          <ToggleMode />
        </Header>
        <SideBar data={data.documentation} setSelectedItem={select} />
        <MainView
          data={selectedItem}
          setSelectedItem={select}
          breadcrumbs={breadcrumbs}
          selectBreadcrumb={selectBreadcrumb}
          searchAssetTypes={searchAssetTypes}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
