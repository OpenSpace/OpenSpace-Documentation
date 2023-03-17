import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from './Table';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Footer from './Footer';

function openUrl(item) {
  window.open(item.Url);
}

function Title({ children }) {
  return (
    <Typography variant={"h5"} sx={{ padding: '35px 0 10px 0' }}>
      {children}
    </Typography>
  );
} 

function Function({ data }) {
  return (
    <>
      <Typography variant={"body2"}>
        { data.Help }
      </Typography>
      <Title>
        { "Function arguments" }
      </Title>
      <Table headers={["Type", "Default Value"]} rows={data.Arguments} />
    </>
  );
}

function Library({data, setSelectedItem}) {
  return (
    <>
      <Title>
        { "Functions" }
      </Title>
      <Table headers={["Help"]} rows={data.Functions} setSelectedItem={setSelectedItem} />
    </>
  );
}

function PropertyOwners({ data, setSelectedItem, select, searchAssetTypes }) {

  function findAssetType(data) {
    const found = searchAssetTypes(data.Type);
    setSelectedItem(found.data, found.crumbs);
  }
  return (
    <>
      <Title>
        { "Property Owners" }
      </Title>
      <Table
        headers={["Type"]}
        rows={data}
        setSelectedItem={select}
        cellFunc={{ Name: "Type", Function: findAssetType }}
      />
    </>
  );
}

function Properties({ data, setSelectedItem }) {
  return (
    <>
      <Title>
        { "Properties" }
      </Title>
      <Table headers={["Description"]} rows={data} setSelectedItem={setSelectedItem} />
    </>
  );
}

function Property({ data }) {
  return (
    <>
      <Title>
        { "Property" }
      </Title>
      <Table
        headers={["URI", "Gui Name", "Type"]}
        rows={[data]}
      />
    </>
  );
}

function Members({ data }) {
  return (
    <>
      <Title>
        { "Class Members" }
      </Title>
      <Table headers={["Description", "Documentation", "Optional", "Type"]} rows={data} />
    </>
  );
}

function Classes({ data, setSelectedItem }) {
  return (
    <>
      <Title>
        { "Classes" }
      </Title>
      <Table headers={[]} rows={data} setSelectedItem={setSelectedItem} />
    </>
  );
}

function License({ data, setSelectedItem }) {
  return (
    <>
      <Title>
        { "Licenses" }
      </Title>
      <Table headers={[]} rows={data} setSelectedItem={setSelectedItem} />
    </>
  );
}

function LicenseAsset({ data }) {
  
  return (
    <>
      <Title>
        { "Assets" }
      </Title>
      <Table
        headers={["Description", "Author", "Path", "Url"]}
        rows={data}
        cellFunc={{ Name: "Url", Function: openUrl }}
      />
    </>
  );
}

function Profile({ data }) {
  return (
    <>
      <Title>
        { data.profileName }
      </Title>
      <Table
        headers={["Author", "License", "Version", "Url"]}
        rows={[data]}
        cellFunc={{ Name: "Url", Function: openUrl }}
      />
    </>
  );
}

function Type({ setSelectedItem, searchAssetTypes, type }) {

  function findAssetType(type) {
    const found = searchAssetTypes(type);
    setSelectedItem(found.data, found.crumbs);
  }

  return (
    <Box sx={{
      display: 'flex',
      gap: '5px',
      justifyContent: 'end',
      marginLeft: 'auto',
      alignItems: 'center'
    }}>
      <Typography sx={{ fontStyle: 'italic', color: 'grey' }} variant={"p"}>
        {"Asset Type"}
      </Typography>
      <Link
        sx={{ fontStyle: 'italic' }}
        component={"button"}
        variant={"body1"}
        onClick={() => findAssetType(type)}
      >
        {type}
      </Link>
    </Box>
  );
}

export default function MainView({
  searchAssetTypes,
  data,
  setSelectedItem,
  breadcrumbs,
  selectBreadcrumb
}) {

  function select(data) {
    const label = data?.Name ?? data?.Identifier ?? data?.id;
    setSelectedItem(data, [...breadcrumbs, label]);
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
        <Breadcrumbs aria-label={"breadcrumb"}>
          {breadcrumbs?.map((crumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return <Typography color={"text.primary"}>{crumb}</Typography>;
            }
            else {
              return (
                <Link
                  component={"button"}
                  variant={"body1"}
                  onClick={() => {
                    selectBreadcrumb(breadcrumbs.slice(0, index + 1));
                  }}
                  underline={"hover"} 
                  color={"inherit"}
                >
                  {crumb}
                </Link>
              );
            }
          })}
        </Breadcrumbs>
        <Typography variant={"h4"} sx={{ padding: '20px 0'}}>
          { data?.Name }
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
          { data?.Description &&
            <Typography variant={"p"}>
              {data.Description}
            </Typography>
          }
          { data?.Properties?.length > 0 && data?.Type &&
            <Type type={data.Type} searchAssetTypes={searchAssetTypes} setSelectedItem={setSelectedItem} />
          }
        </Box>
        { data?.Functions && <Library data={data} setSelectedItem={select} /> }
        { data?.Arguments && <Function data={data} />}
        { data?.Properties?.length > 0 && <Properties data={data.Properties} setSelectedItem={select} />}
        { data?.PropertyOwners?.length > 0 &&
          <PropertyOwners
            data={data.PropertyOwners}
            setSelectedItem={setSelectedItem}
            select={select}
            searchAssetTypes={searchAssetTypes}
          />}
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