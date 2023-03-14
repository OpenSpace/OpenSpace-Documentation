import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ResizeableDrawer from './ResizeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function SideBar({ data, setSelectedItem }) {

  function renderTree(data, parents) {
    const identifier = data?.Identifier ?? data?.Name;
    const label = data?.Name ?? data?.Identifier;
    const nestedData = data.Data;
    return identifier && (
      <TreeItem
        key={identifier}
        nodeId={identifier}
        label={label}
        onClick={() => {
          setSelectedItem(data, [...parents, label])
        }}
      >
        {Array.isArray(nestedData) && nestedData.map((item) => renderTree(item, [...parents, label]))}
      </TreeItem>
    );
  }

  return (
    <ResizeableDrawer>
      <Toolbar />
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto', paddingTop : '20px', marginRight: '3px' }}
        >
        {data.map((item, index) => {
          // Add a divider after the first two items
          if (index === 2) {
            return (
              <>
                <Divider key={"divider"} />
                {renderTree(item, [])}
              </>);
          }
          return renderTree(item, []);
        })}
        </TreeView>
    </ResizeableDrawer>
  );
}
  