import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';

export const SuppliersPage = () => {
  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Proveedores</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Ahora que añadiste los proveedores necesarios, ya puedes
        <Link href="/eventos" sx={{ color: 'brand.blue', mx: '3xs' }}>
          registrar tus eventos
        </Link>
        o
        <Link href="/inventario" sx={{ color: 'brand.blue', ml: '3xs' }}>
          añadir movimientos de inventario.
        </Link>
      </Text>
    </Flex>
  );
};
