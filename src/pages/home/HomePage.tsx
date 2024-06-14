import { Box, Heading, List, ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Box p="lg" bg="primary.100">
      <Heading as="h1" mb="md" fontSize="heading.desktop.1">
        HOME PAGE
      </Heading>
      <List spacing="xs" textColor="text.default">
        <ListItem>
          <Link as={RouterLink} to="/ayuda">
            Ayuda
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/eventos">
            Módulo de eventos
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/financiero">
            Módulo financiero
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/inventario">
            Módulo de inventario
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/organizacional">
            Módulo de información organizacional
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/financiero">
            Módulo financiero
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Home;
