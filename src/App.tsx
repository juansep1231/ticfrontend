import React from 'react';
import { ChakraProvider, ColorModeScript, Box } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';

import customTheme from '../theme/theme';
import Fonts from '../theme/fonts';

const App: React.FC = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={customTheme}>
        <Fonts />
        <Box
          sx={{
            fontSize: 'heading.desktop.1',
            bg: 'primary.200',
            textColor: 'brand.grey',
          }}
        >
          Hola mundo!
        </Box>
        <Box
          sx={{
            fontSize: 'heading.desktop.1',
            bg: 'primary.200',
            textColor: 'yellow',
          }}
        >
          Hola mundo!
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
