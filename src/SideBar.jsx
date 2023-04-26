import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ResizeableDrawer from './ResizeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

export default function SideBar({ data, setSelectedItem }) {

  function renderTree(data, parents) {
    let label = data?.fullName ?? data.name;

    return label && (
      <TreeItem
        key={label}
        nodeId={label}
        label={label}
        onClick={() => {
          setSelectedItem(data, [...parents, label])
        }}
      >
        {Array.isArray(data?.data) && data.data.map((item) => renderTree(item, [...parents, label]))}
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
          if (index === 4) {
            return (
              <>
                <Divider key={"divider"} sx={{ marginTop: '10px', marginBottom: '10px' }} />
                {renderTree(item, [])}
              </>);
          }
          return renderTree(item, []);
        })}
        </TreeView>
    </ResizeableDrawer>
  );
}
  