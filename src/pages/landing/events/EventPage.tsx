import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { EventsTable } from './components/EventsTable';

export const EventsPage = () => {
  const [isAddSupplierModalOpen, setAddSupplierModalOpen] = useState(false);

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Eventos</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Antes de añadir un evento, asegúrate de que el proveedor ya se encuentre
        registrado. En caso de no estar seguro revisa los
        <Link href="/proveedores" sx={{ color: 'brand.blue', ml: '3xs' }}>
          proveedores disponibles.
        </Link>
      </Text>
      <EventsTable />
    </Flex>
  );
};
