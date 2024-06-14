import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';

import customTheme from './theme/theme';
import Fonts from './theme/fonts';
import MainRouter from './components/MainRouter';

const App: React.FC = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={customTheme}>
        <Fonts />
        <MainRouter />
      </ChakraProvider>
    </>
  );
};

export default App;
