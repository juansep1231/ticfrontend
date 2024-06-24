import { Box, Heading, Flex } from '@chakra-ui/react';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const Home = () => {
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
        <Heading>Home Page</Heading>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Home;
