import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { SubscribersTable } from './components/SubscribersTable';

export const SubscribersPage = () => {
  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Aportantes</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Antes de añadir un aportante, asegúrate de que los planes de suscripción
        ya se encuentren registrados. En caso de no estar seguro revisa los
        <Link
          href="/aportaciones/planes-aportacion"
          sx={{ color: 'brand.blue', ml: '3xs' }}
        >
          planes de aportación disponibles.
        </Link>
      </Text>
      <SubscribersTable />
    </Flex>
  );
};
