import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { ProductsTable } from './components/ProductsTable';

export const ProductsPage = () => {
  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Productos</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Ahora que añadiste los productos necesarios, no olvides
        <Link href="/proveedores" sx={{ color: 'brand.blue', mx: '3xs' }}>
          registrar tus proveedores
        </Link>
        previo a
        <Link href="/inventario" sx={{ color: 'brand.blue', ml: '3xs' }}>
          añadir tus movimientos de inventario.
        </Link>
      </Text>
      <ProductsTable />
    </Flex>
  );
};
