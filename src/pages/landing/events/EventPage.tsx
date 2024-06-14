import { Box, Heading, List, ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const EventsPage = () => {
  return (
    <Box p="lg" bg="primary.100">
      <Heading as="h1" mb="md" fontSize="heading.desktop.1">
        EVENTOS
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

export default EventsPage;
