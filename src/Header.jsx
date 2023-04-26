
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Popover } from '@mui/material';
import { Divider } from '@mui/material';
import Link from '@mui/material/Link';

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
    <Box
      sx={{
        cursor: 'pointer',
        maxWidth: '100%',
        '&:hover': {
          backgroundColor: (theme) => {
            return theme.palette.mode === 'dark' ?
              '#262424' :
              theme.palette.grey['100'] 
          }
        }
      }}
      onClick={() => setSelectedItem(data, crumbs)}
    >
      <Link key={`all${data?.name}`} sx={{ p: 2, pt: 1, pb: 0}} >
        {data?.name}
      </Link>
      <Typography
        sx={{
          p: 2,
          pt: 0,
          pb: 1,
          color: (theme) => {
            return theme.palette.text.secondary
          },
          overflowWrap: 'break-word',
        }}>
        {crumbs.map(crumb => crumb + "/")}
      </Typography>
    </Box>
  );
}

function Header({ searchDocumentation, searchSelectedItem, setSearchText, setSelectedItem, children }) { 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchResultsAll, setSearchResultsAll] = React.useState([]);
  const [searchResultsSelected, setSearchResultsSelected] = React.useState([]);

  function onChange(event) {
    setSearchText(event.target.value);
  }

  function search() {
    setSearchResultsAll(searchDocumentation());
    setSearchResultsSelected(searchSelectedItem());
  }
  
  function onFocus(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
              src={"./logo.png"}
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
                onKeyPress={(event) => event.key === "Enter" && search()}
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
                      <Typography variant={"h6"} sx={{ p: 2 }}>
                        {"Search documentation"}
                      </Typography>
                      {searchResultsAll.length > 0 ?
                        searchResultsAll.map(({ data, crumbs }) =>
                          SearchCard({ data, crumbs, setSelectedItem })
                        )
                        : <Typography sx={{ p: 2 }}>
                          {"No results"}
                        </Typography>
                      }
                    </Box>
                    <Divider orientation={'vertical'} />
                    <Box sx={{ width: "50%" }}>
                      <Typography variant={"h6"} sx={{ p: 2 }}>
                        {"Search this page"}
                      </Typography>
                      {searchResultsSelected.length > 0 ?
                        searchResultsSelected.map(({ data, crumbs }) =>
                          SearchCard({ data, crumbs, setSelectedItem }))
                        : <Typography sx={{ p: 2 }}>
                          {"No results"}
                        </Typography> 
                      }
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