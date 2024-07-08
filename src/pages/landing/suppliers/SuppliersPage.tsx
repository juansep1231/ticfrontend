import { useState } from 'react';
import { Heading, Flex, Link, Text } from '@chakra-ui/react';

import { Supplier } from '../../../types/supplier-models';

import { SuppliersTable } from './components/SuppliersTable';
import { EditSupplierModal } from './components/EditSupplierModal';

export const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'ABC Supplies Co.',
    phone: '+1-555-123-4567',
    email: 'contact@abcsupplies.com',
  },
  {
    id: 2,
    name: 'Global Industrial',
    phone: '+1-555-987-6543',
    email: 'sales@globalindustrial.com',
  },
  {
    id: 3,
    name: 'Tech Solutions Ltd.',
    phone: '+44-20-7946-0958',
    email: 'info@techsolutions.co.uk',
  },
  {
    id: 4,
    name: 'Creative Supplies Inc.',
    phone: '+1-555-567-8910',
    email: 'support@creativesupplies.com',
  },
  {
    id: 5,
    name: 'Supply Chain Partners',
    phone: '+61-2-1234-5678',
    email: 'partners@supplychain.com.au',
  },
  {
    id: 6,
    name: 'Eco-Friendly Goods',
    phone: '+1-555-234-6789',
    email: 'eco@friendlygoods.com',
  },
];

export const SuppliersPage = () => {
  const [isEditSupplierModalOpen, setEditSupplierModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const handleEditMovement = (data: { supplier: Supplier }) => {
    console.log('Movimiento de inventario actualizado:', data.supplier);
  };

  const handleDeleteMovement = (id: number | undefined) => {
    setSuppliers(suppliers.filter((event) => event.id !== id));
    console.log('Movimiento de transacción eliminado:', id);
  };

  const openEditMovementModal = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditSupplierModalOpen(true);
  };

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
      <SuppliersTable
        suppliers={suppliers}
        onEdit={openEditMovementModal}
        onDelete={handleDeleteMovement}
      />

      <EditSupplierModal
        isOpen={isEditSupplierModalOpen}
        onClose={() => setEditSupplierModalOpen(false)}
        supplier={selectedSupplier}
        onSubmit={handleEditMovement}
      />
    </Flex>
  );
};
