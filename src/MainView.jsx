import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from './Table';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Footer from './Footer';

function Function({data}) {
  return (
    <>
      <Typography variant="body2">
        { data.help }
      </Typography>
      <Typography variant="h6">
        { "Function arguments" }
      </Typography>
      <Table headers={["type", "defaultValue"]} rows={data.arguments} />
    </>
  );
}

function Library({data, setSelectedItem}) {
  return (
    <>
      <Typography variant="h5">
        { "Functions" }
      </Typography>
      <Table headers={["help"]} rows={data.functions} setSelectedItem={setSelectedItem} />
    </>
  );
}

function PropertyOwners({ data, setSelectedItem }) {
  return (
        <>
          <Typography variant="h5">
            { "Property Owners" }
          </Typography>
          <Table headers={[]} rows={data} setSelectedItem={setSelectedItem} />
        </>
      )
}

function Properties({ data }) {
  return (
        <>
          <Typography variant="h5">
            { "Properties" }
          </Typography>
          <Table headers={["description", "fullyQualifiedId", "guiName", "id", "type"]} rows={data} />
        </>
      )
}

function Members({ data }) {
  return (
        <>
          <Typography variant="h5">
            { "Class Members" }
          </Typography>
          <Table headers={["description", "documentation", "optional", "type"]} rows={data} />
        </>
      )
}

function Classes({ data, setSelectedItem }) {
  return (
        <>
          <Typography variant="h5">
            { "Classes" }
          </Typography>
          <Table headers={[]} rows={data} setSelectedItem={setSelectedItem}/>
        </>
      )
}

function License({ data, setSelectedItem }) {
  return (
        <>
          <Typography variant="h5">
            { "Licenses" }
          </Typography>
          <Table headers={["description", "documentation", "optional", "type"]} rows={data} setSelectedItem={setSelectedItem} />
        </>
      )
}

function LicenseAsset({ data }) {
  return (
        <>
          <Typography variant="h5">
            { "Assets" }
          </Typography>
          <Table headers={["description", "author", "path", "url"]} rows={data} />
        </>
      )
}

function Profile({ data }) {
  return (
        <>
          <Typography variant="h5">
            { data.profileName }
          </Typography>
          <Table headers={["description", "author", "license", "version", "url"]} rows={[data]} />
        </>
      )
}

export default function MainView({ data, setSelectedItem, breadcrumbs, selectBreadcrumb }) {

  function select(data) {
    setSelectedItem(data, [...breadcrumbs, data.name]);
  }

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1000,
        p: 3,
        minHeight: '100vh',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      <Toolbar />
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return <Typography color="text.primary">{crumb}</Typography>;
            }
            else {
              return (
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => {
                    selectBreadcrumb(breadcrumbs.slice(0, index + 1));
                  }}
                  underline="hover" 
                  color="inherit"
                >
                  {crumb}
                </Link>
              );
            }
          })}
        </Breadcrumbs>
        <Typography variant="h4">
          { data?.name }
        </Typography>
        { data?.functions && <Library data={data} setSelectedItem={select} /> }
        { data?.arguments && <Function data={data} />}
        { data?.properties?.length > 0 && <Properties data={data.properties} />}
        { data?.propertyOwners?.length > 0 && <PropertyOwners data={data.propertyOwners} setSelectedItem={select} />}
        { data?.classes?.length > 0 && <Classes data={data.classes} setSelectedItem={select} />}
        { data?.members?.length > 0 && <Members data={data.members} setSelectedItem={select} />}
        { data?.licenses && <License data={data.licenses} setSelectedItem={select} />}
        { data?.assets && <LicenseAsset data={data.assets} />}
        { data?.author && <Profile data={data} />}
      </Box>
      <Footer />
    </Box>
  );
}