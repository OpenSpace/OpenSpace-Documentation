import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function SideBar({data, setSelectedItem}) {
  const renderTree = (nodes) => {
    if(Array.isArray(nodes)) {
      return nodes.map((node) => renderTree(node));
    }
    else if (typeof nodes === 'object'){
      const identifier = nodes.identifier ?  nodes.identifier : nodes?.id;
      const label = nodes.name ?? identifier;
      const nextData = nodes.data ?? nodes.entries;
      return identifier && <TreeItem key={identifier} nodeId={identifier} label={label} >
      {Array.isArray(nextData)
        ? nextData.map((node) => renderTree(node))
        : null}
    </TreeItem>
    }
    else {
      return <Typography onClick={() => setSelectedItem(nodes)}>{nodes}</Typography>
    }
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', paddingTop: '20px'}}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
        >
          {renderTree(data)}
        </TreeView>
      </Box>
    </Drawer>
  );
}
  