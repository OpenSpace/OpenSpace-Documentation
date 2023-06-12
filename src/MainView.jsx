import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from './Table';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Footer from './Footer';

function openUrl(item) {
  window.open(item.url);
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
      <Table headers={["type", "defaultValue"]} rows={data.arguments} />
    </>
  );
}

function Library({ data, setSelectedItem }) {
  return (
    <>
      <Title>
        { "Functions" }
      </Title>
      <Table headers={["help"]} rows={data.functions} setSelectedItem={setSelectedItem} />
    </>
  );
}

function PropertyOwners({ data, setSelectedItem, select, searchAssetTypes }) {

  function findAssetType(data) {
    const found = searchAssetTypes(data.type);
    setSelectedItem(found.data, found.crumbs);
  }

  return (
    <>
      <Title>
        { "Property Owners" }
      </Title>
      <Table
        headers={["type"]}
        rows={data}
        setSelectedItem={select}
        cellFunc={{ name: "type", Function: findAssetType }}
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
      <Table headers={["description"]} rows={data} setSelectedItem={setSelectedItem} />
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
        headers={["uri", "guiName", "type"]}
        rows={[data]}
      />
    </>
  );
}

function Keybindings({ data }) {
  return (
    <>
      <Title>
        { "Keybindings" }
      </Title>
      <Table
        headers={["action"]}
        rows={data}
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
      <Table headers={["description", "documentation", "optional", "type"]} rows={data} />
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
        headers={["description", "author", "path", "url"]}
        rows={data}
        cellFunc={{ name: "url", Function: openUrl }}
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
        headers={["author", "license", "version", "url"]}
        rows={[data]}
        cellFunc={{ name: "url", Function: openUrl }}
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
      <Typography sx={{ fontStyle: 'italic', color: 'grey', whiteSpace: 'nowrap' }} variant={"p"}>
        {"Type"}
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
    const label = data?.name ?? data?.Identifier ?? data?.id;
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
              return <Typography key={`crumb${crumb}`} color={"text.primary"}>{crumb}</Typography>;
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
                  key={`crumblink${crumb}`}
                >
                  {crumb}
                </Link>
              );
            }
          })}
        </Breadcrumbs>
        <Typography variant={"h4"} sx={{ padding: '20px 0'}}>
          { data?.name }
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
          { data?.description &&
            <Typography variant={"p"}>
              {data.description}
            </Typography>
          }
          { data?.properties?.length > 0 && data?.type &&
            <Type type={data.type} searchAssetTypes={searchAssetTypes} setSelectedItem={setSelectedItem} />
          }
        </Box>
        {data?.tags?.length > 0 && (
          <Typography variant={"p"} sx={{ fontStyle: 'italic', color: 'grey', marginTop: '20px' }}>
            {`Tags:${data.tags.map(tag => " " + tag)}`}
          </Typography>
        )}
        { data?.functions && <Library data={data} setSelectedItem={select} /> }
        { data?.arguments && <Function data={data} />}
        { data?.properties?.length > 0 && <Properties data={data.properties} setSelectedItem={select} />}
        { data?.propertyOwners?.length > 0 &&
          <PropertyOwners
            data={data.propertyOwners}
            setSelectedItem={setSelectedItem}
            select={select}
            searchAssetTypes={searchAssetTypes}
          />}
        { data?.classes?.length > 0 && <Classes data={data.classes} setSelectedItem={select} />}
        { data?.members?.length > 0 && <Members data={data.members} setSelectedItem={select} />}
        { data?.licenses && <License data={data.licenses} setSelectedItem={select} />}
        { data?.assets && <LicenseAsset data={data.assets} />}
        { data?.author && <Profile data={data} />}
        { data?.uri && <Property data={data} />}
        { data?.keybindings && <Keybindings data={data.keybindings} />}
      </Box>
      <Footer />
    </Box>
  );
}