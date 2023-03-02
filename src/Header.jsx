
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
import { ObjectWordBeginningSubstring } from './StringMatchers';

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

function Header({ search, searchText, setSearchText, data, selectedItem, setSelectedItem }) { 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const searchResultsAll = React.useRef([]);
  const searchResultsSelected = React.useRef([]);

  function onChange(event) {
    setSearchText(event.target.value);
    searchResultsAll.current = [];
    searchResultsSelected.current = [];
    
    findSearchResults(searchResultsAll, data);
    if (selectedItem) {
      findSearchResults(searchResultsSelected, selectedItem);
    }
  }
  
  function onFocus(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function findSearchResults(searchResults, documentationData) {
    if (!searchText) return;
    if (Array.isArray(documentationData)) {
      documentationData.map(item => findSearchResults(searchResults, item));
    }
    else if (typeof documentationData === 'object') {
      const found = ObjectWordBeginningSubstring(documentationData, searchText);
      if (found) {
        searchResults.current.push(documentationData);
      }
      if(documentationData?.data) {
        documentationData.data.map(item => findSearchResults(searchResults, item));
      }
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
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
            Documentation
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChange}
              onFocus={onFocus}
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
                    {searchText && searchResultsAll.current.map(item => 
                      <Typography key={`all${item?.identifier ?? item.name}`} sx={{ p: 2, }} onClick={() => setSelectedItem(item)}>
                        {item?.name ?? item.identifier}
                      </Typography>)
                    }
                  </Box>
                  <Divider orientation={'vertical'} />
                  <Box sx={{ width: "50%" }}>
                     {searchText && searchResultsSelected.current.map(item => 
                      <Typography key={item?.identifier ?? item.name} sx={{ p: 2, }} onClick={() => setSelectedItem(item)}>
                        {item?.name ?? item.identifier}
                      </Typography>)
                    }
                  </Box>
                </Box>
              </Popover>
            )}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>      
  );
}

export default Header;