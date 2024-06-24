import { Flex, Box, Heading } from '@chakra-ui/react';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const NotFoundPage = () => {
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
        <Heading>404</Heading>
        <Heading>NOT FOUND</Heading>
      </Box>
      <Footer />
    </Flex>
  );
};

export default NotFoundPage;
