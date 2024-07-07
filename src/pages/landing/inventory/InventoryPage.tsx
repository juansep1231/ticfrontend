import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { InventoryTable } from './components/InventoryTable';

export const InventoryPage = () => {
  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Inventario</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Antes de añadir un movimiento de inventario, asegúrate de que tu
        producto y proveedor ya se encuentren registrados. En caso de no estar
        seguro revisa los
        <Link
          href="/inventario/productos"
          sx={{ color: 'brand.blue', ml: '3xs' }}
        >
          productos existentes
        </Link>{' '}
        y los{' '}
        <Link href="/proveedores" sx={{ color: 'brand.blue', ml: '3xs' }}>
          proveedores disponibles.
        </Link>
      </Text>
      <InventoryTable />
    </Flex>
  );
};
