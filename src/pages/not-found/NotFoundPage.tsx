import { Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box p="lg" bg="brand.red.200">
      <Heading as="h1" mb="md" fontSize="heading.desktop.1">
        404
      </Heading>
      <Heading as="h3" mb={4} fontSize="heading.desktop.3">
        Page not found
      </Heading>
      <Link as={RouterLink} to="/" fontSize="heading.desktop.subtitle">
        Return home
      </Link>
    </Box>
  );
};

export default NotFoundPage;
