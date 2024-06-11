import React from 'react';
import { Box } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        fontSize: '32',
        bg: 'blue',
        textColor: 'white',
      }}
    >
      Hola mundo!
    </Box>
  );
};

export default App;
