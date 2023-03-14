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
        { data.Help }
      </Typography>
      <Typography variant="h6">
        { "Function arguments" }
      </Typography>
      <Table headers={["Type", "Default Value"]} rows={data.Arguments} />
    </>
  );
}

function Library({data, setSelectedItem}) {
  return (
    <>
      <Typography variant="h5">
        { "Functions" }
      </Typography>
      <Table headers={["Help"]} rows={data.Functions} setSelectedItem={setSelectedItem} />
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

function Properties({ data, setSelectedItem }) {
  return (
        <>
          <Typography variant="h5">
            { "Properties" }
          </Typography>
          <Table headers={["Description"]} rows={data} setSelectedItem={setSelectedItem} />
        </>
      )
}

function Property({ data }) {
  return (
    <>
      <Typography variant="h5">
        {'Property'}
      </Typography>
      <Table headers={["URI", "Gui Name", "Type"]} rows={[data]} />
    </>
  );
}

function Members({ data }) {
  return (
        <>
          <Typography variant="h5">
            { "Class Members" }
          </Typography>
          <Table headers={["Description", "Documentation", "Optional", "Type"]} rows={data} />
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
          <Table headers={[]} rows={data} setSelectedItem={setSelectedItem} />
        </>
      )
}

function LicenseAsset({ data }) {
  return (
        <>
          <Typography variant="h5">
            { "Assets" }
          </Typography>
          <Table headers={["Description", "Author", "Path", "Url"]} rows={data} />
        </>
      )
}

function Profile({ data }) {
  return (
    <>
      <Typography variant="h5">
        {data.profileName}
      </Typography>
      <Table headers={["Author", "License", "Version", "Url"]} rows={[data]} />
    </>
  );
}

export default function MainView({ data, setSelectedItem, breadcrumbs, selectBreadcrumb }) {
  function select(data) {
    const label = data?.Name ?? data?.Identifier ?? data?.id;
    setSelectedItem(data, [...breadcrumbs, label]);
  }
  console.log(data)
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
          {breadcrumbs?.map((crumb, index) => {
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
          { data?.Name }
        </Typography>
        { data?.Description && <Typography variant={"p"}>{data.Description}</Typography>}
        { data?.Functions && <Library data={data} setSelectedItem={select} /> }
        { data?.Arguments && <Function data={data} />}
        { data?.Properties?.length > 0 && <Properties data={data.Properties} setSelectedItem={select} />}
        { data?.PropertyOwners?.length > 0 && <PropertyOwners data={data.PropertyOwners} setSelectedItem={select} />}
        { data?.Classes?.length > 0 && <Classes data={data.Classes} setSelectedItem={select} />}
        { data?.Members?.length > 0 && <Members data={data.Members} setSelectedItem={select} />}
        { data?.Licenses && <License data={data.Licenses} setSelectedItem={select} />}
        { data?.Assets && <LicenseAsset data={data.Assets} />}
        { data?.Author && <Profile data={data} />}
        { data?.URI && <Property data={data} />}
      </Box>
      <Footer />
    </Box>
  );
}