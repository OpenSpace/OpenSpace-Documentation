import * as React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';

const ColorModeContext = React.createContext()

function ColorModeProvider(props) {
  const [mode, setMode] = React.useState('dark');
  const initialMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true }) ? 'dark' : 'light';

  React.useEffect(() => {
    setMode(initialMode);
  }, []); 
  
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
 
  return <ColorModeContext.Provider value={[mode, colorMode.toggleColorMode]} {...props} />
}
function useColorMode() {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    throw new Error('The hook \'useColorMode\' must be used within a ColorModeProvider');
  }
  return context;
}

export { ColorModeProvider, useColorMode };
