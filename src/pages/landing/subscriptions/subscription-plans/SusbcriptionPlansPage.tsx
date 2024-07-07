import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { SubscriptionPlansTable } from './components/SubscribtionPlansTable';

export const SubscriptionPlansPage = () => {
  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Planes de Aportación</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Una vez que añadiste los planes de aportación necesarios, ya puedes
        <Link
          href="/aportaciones/aportantes"
          sx={{ color: 'brand.blue', ml: '3xs' }}
        >
          registrar a tus aportantes.
        </Link>
      </Text>
      <SubscriptionPlansTable />
    </Flex>
  );
};
