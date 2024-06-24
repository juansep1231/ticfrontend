import { Flex, Box, Heading } from '@chakra-ui/react';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const HelpPage = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        minHeight: '100vh',
        gap: 'xl',
      }}
    >
      <Navbar />
      <Box flex="1" sx={{ px: { base: 'md', lg: '3xl' } }}>
        <Heading>Ayuda</Heading>
      </Box>
      <Footer />
    </Flex>
  );
};

export default HelpPage;
