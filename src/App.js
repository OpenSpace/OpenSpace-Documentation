import React from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainView from './MainView';
import { data } from "./documentationData.js";

function App() {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [breadcrumbs, setBreadcrumbs] = React.useState(null);
  const [searchText, setSearchText] = React.useState(null);

  function search(string) {
    setSelectedItem(data.documentation.filter(item => item.name.includes(string.target.value)));
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        search={search}
        searchText={searchText}
        setSearchText={setSearchText}
        data={data.documentation}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
      />
      <SideBar data={data.documentation} setSelectedItem={setSelectedItem} setBreadcrumbs={setBreadcrumbs}/>
      <MainView data={selectedItem} setSelectedItem={setSelectedItem} />
    </Box>
  );
}

export default App;
