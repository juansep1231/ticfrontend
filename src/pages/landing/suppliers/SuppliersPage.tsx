import { useState } from 'react';
import { Heading, Flex, Link, Text } from '@chakra-ui/react';

import { Supplier } from '../../../types/supplier-models';

import { SuppliersTable } from './components/SuppliersTable';
import { EditSupplierModal } from './components/EditSupplierModal';
import { useFetchProviders } from '../../../hooks/inventory/fetchProviderHook';
import useUpdateProvider, { CreateUpdateProviderDTO } from '../../../hooks/inventory/updateProviderHook';
import usePatchProviderState from '../../../hooks/inventory/patchProviderHook';


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
  const {
    providers,
    isLoadingProviders,
    providerErrors,
    updateProviderState,
  } = useFetchProviders();
  const {updateProvider, updateError} = useUpdateProvider();
 const {patchProviderState, patchError} = usePatchProviderState();


  const handleEditMovement = async (data: { supplier: Supplier }) => {
    try {
      const updatedInfo: CreateUpdateProviderDTO = {
        name: data.supplier.name,
        phone: data.supplier.phone,
        email: data.supplier.email       
      };

      await updateProvider(data.supplier.id!, updatedInfo);

      updateProviderState(data.supplier.id!, { ...data.supplier, ...updatedInfo });

      console.log('Updated organizational information:', data.supplier);
    } catch (error) {
      console.error('Failed to update association:', error);
    }
  };

  const handleDeleteMovement = async (id: number | undefined) => {
    try {
      await patchProviderState(id!);
      updateProviderState(id!, { stateid: 2 });
      console.log('Informacion organizacional eliminada:', id);
    } catch (error) {
      console.error('Failed to update association state:', error);
    }
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
        suppliers={providers}
        onEdit={openEditMovementModal}
        onDelete={handleDeleteMovement}
        error={providerErrors}
        isLoading={isLoadingProviders}
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
