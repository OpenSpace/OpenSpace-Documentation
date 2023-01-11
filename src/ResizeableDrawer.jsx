import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

export default function PermanentDrawerLeft({ children }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
      variant="permanent"
      anchor="left"
    >
      { children }
    </Drawer>
  );
}