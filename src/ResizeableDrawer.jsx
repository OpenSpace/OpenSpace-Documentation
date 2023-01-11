import React, { useState, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';

const defaultDrawerWidth = 240;
const minDrawerWidth = 200;

const style = {
    width: '5px',
    backgroundColor: '#f4f7f9',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
};

export default function ResizeableDrawer({ children }) {
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth)
  
  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX;
    setDrawerWidth(Math.max(newWidth, minDrawerWidth));
    e.preventDefault();
    e.stopPropagation();
  }, []);

  function handleMouseUp() {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  }

  function handleMouseDown(e) {
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
  }

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      PaperProps={{ style: { width: drawerWidth } }}
    >
      <div
        onMouseDown={(e) => handleMouseDown(e)}
        style={style}
      />
      { children }
    </Drawer>
  )
}
