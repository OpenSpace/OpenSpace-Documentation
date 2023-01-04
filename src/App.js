import React from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainView from './MainView';
import { data } from "./data.js";

function App() {
  const [selectedItem, setSelectedItem] = React.useState(null);

  function search(string) {
    console.log(string)
    setSelectedItem(data.documentation.filter(item => item.name.includes(string.target.value)));
    console.log(selectedItem)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header search={search} />
      <SideBar data={data.documentation} setSelectedItem={setSelectedItem}/>
      <MainView data={selectedItem}/>
    </Box>
  );
}

export default App;