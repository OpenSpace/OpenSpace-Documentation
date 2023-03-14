
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from './img/logo.png'; // Tell webpack this JS file uses this image
import { Popover } from '@mui/material';
import { Divider } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchCard({ data, crumbs, setSelectedItem }) {
  return (
    <Box sx={{ cursor: 'pointer', maxWidth: '100%' }} onClick={() => setSelectedItem(data, crumbs)}>
      <Typography key={`all${data?.Name}`} sx={{ p: 2, paddingBottom: 0}} >
        {data?.Name}
      </Typography>
      <Typography sx={{ p: 2, paddingTop: 0, paddingBottom: 0, color: 'grey', overflowWrap: 'break-word'}}>
        {crumbs.map(crumb => crumb + "/")}
      </Typography>
    </Box>
  );
}

function Header({ search, searchText, setSearchText, data, selectedItem, setSelectedItem, breadcrumbs, children }) { 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchResultsAll, setSearchResultsAll] = React.useState([]);
  const [searchResultsSelected, setSearchResultsSelected] = React.useState([]);

  function onChange(event) {
    setSearchText(event.target.value);
  }

  function search() {
    setSearchResultsAll([]);
    setSearchResultsSelected([]);
    
    let searchResultsAllCopy = [];
    findSearchResults(searchResultsAllCopy, data, []);
    setSearchResultsAll(searchResultsAllCopy);
      
    if (selectedItem) {
      let searchResultsSelectedCopy = [];
      findSearchResults(searchResultsSelectedCopy, selectedItem, breadcrumbs);
      setSearchResultsSelected(searchResultsSelectedCopy);
    }
  }
  
  function onFocus(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function findSearchResults(searchResults, documentationData, parents) {
    if (!searchText) return;
    if (Array.isArray(documentationData)) {
      documentationData.map(item => findSearchResults(searchResults, item, [...parents, item.Name]));
    }
    else if (typeof documentationData === 'object') {
      const found = documentationData.Name.toLowerCase().includes(searchText.toLowerCase());
      if (found) {
        searchResults.push({ data: documentationData, crumbs: parents });
      }
      Object.values(documentationData).map(nestedData => {
        if (Array.isArray(nestedData)) {
          nestedData.map(item => findSearchResults(searchResults, item, [...parents, item.Name]))
        } 
        else {
          findSearchResults(searchResults, nestedData, [...parents, nestedData.Name])
        }
      });
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedItem([], [])}>
            <img
              src={logo}
              alt={`OpenSpace Logo`}
              style={{ maxWidth: '200px' }}
              />
            <Typography
              variant="h6"
              noWrap
              component="div"
              align="left"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {"Documentation"}
            </Typography>
          </Box>
          <Box
           sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            { children }
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
                onFocus={onFocus}
                onKeyPress={(event) => event.key == "Enter" && search()}
              />
              {open && (
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  disableAutoFocus={true}
                >
                  <Box sx={{ 
                    width: 800,
                    height: 800,
                    display: 'flex',
                  }}>
                    <Box sx={{ width: "50%" }}>
                      {searchText && searchResultsAll.map(({ data, crumbs }) =>
                        SearchCard({ data, crumbs, setSelectedItem })
                      )}
                    </Box>
                    <Divider orientation={'vertical'} />
                    <Box sx={{ width: "50%" }}>
                      {searchText && searchResultsSelected.map(({ data, crumbs }) => SearchCard({ data, crumbs, setSelectedItem }))}
                    </Box>
                  </Box>
                </Popover>
              )}
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>      
  );
}

export default Header;