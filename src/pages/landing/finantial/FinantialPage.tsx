import { Box, Heading, List, ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const FinantialPage = () => {
  return (
    <Box p="lg" bg="primary.100">
      <Heading as="h1" mb="md" fontSize="heading.desktop.1">
        MÓDULO FINANCIERO
      </Heading>
      <List spacing="xs" textColor="text.default">
        <ListItem>
          <Link as={RouterLink} to="/">
            Regresar a home
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default FinantialPage;
