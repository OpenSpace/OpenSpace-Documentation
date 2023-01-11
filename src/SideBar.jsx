import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ResizeableDrawer from './ResizeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function SideBar({ data, setSelectedItem }) {
  
  const renderTree = (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => renderTree(item));
    }
    else if (typeof data === 'object') {
      const identifier = data?.identifier ?? data?.name;
      const label = data?.name ?? identifier;
      const nestedData = data.data;
      return identifier && (
        <TreeItem key={identifier} nodeId={identifier} label={label} onClick={() => setSelectedItem(data)}>
          {Array.isArray(nestedData) && nestedData.map((item) => renderTree(item))}
        </TreeItem>
      );
    }
    else {
      return <Typography onClick={() => setSelectedItem(data)}>{data}</Typography>
    }
  }

  return (
    <ResizeableDrawer>
      <Toolbar />
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto', paddingTop : '20px' }}
        >
          {renderTree(data)}
        </TreeView>
    </ResizeableDrawer>
  );
}
  