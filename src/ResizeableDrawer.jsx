import React, { useCallback } from "react";
import Drawer from '@mui/material/Drawer';
import { useColorMode } from "./ColorModeContext";

export const defaultDrawerWidth = 260;
const minDrawerWidth = 100;
const maxDrawerWidth = 1000;

const draggerStyle = {
  width: "5px",
  cursor: "ew-resize",
  padding: "4px 0 0",
  borderRight: "3px solid gray",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
};


export default function PermanentDrawerLeft({ children }) {
  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);
  const [mode, toggleColorMode] = useColorMode();
  const dragBarColor = mode === 'dark' ? '#313131' : '#ebebeb';

  const handleMouseDown = e => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback(e => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
    e.preventDefault();
    e.stopPropagation();
  }, []);

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
      PaperProps={{ style: { width: drawerWidth } }}
      anchor="left"
    >
      <div onMouseDown={e => handleMouseDown(e)} style={{ ...draggerStyle,  borderColor: dragBarColor }} />
      { children }
    </Drawer>
  );
}