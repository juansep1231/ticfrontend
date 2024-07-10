import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { InventoryTable } from './components/InventoryTable';
import { useState } from 'react';
import { Inventory } from '../../../types/inventory-models';
import { EditInventoryModal } from './components/EditInventoryModal';
import { useFetchInventoryMovements } from '../../../hooks/inventory/fetchInventoryHook';

export const initialInventory: Inventory[] = [
  {
    id: 1,
    product: 'Laptop',
    movementType: 'COMPRA',
    quantity: 10,
    date: '2024-01-05',
  },
  {
    id: 2,
    product: 'Mouse',
    movementType: 'VENTA',
    quantity: 5,
    date: '2024-01-06',
  },
  {
    id: 3,
    product: 'Teclado',
    movementType: 'DONACIÓN',
    quantity: 2,
    date: '2024-01-07',
  },
  {
    id: 4,
    product: 'Monitor',
    movementType: 'DESECHO',
    quantity: 1,
    date: '2024-01-08',
  },
  {
    id: 5,
    product: 'Impresora',
    movementType: 'COMPRA',
    quantity: 3,
    date: '2024-01-09',
  },
  {
    id: 6,
    product: 'Proyector',
    movementType: 'VENTA',
    quantity: 1,
    date: '2024-01-10',
  },
];

export const InventoryPage = () => {
  const [isEditInventoryModalOpen, setEditInventoryModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(
    null
  );
  const [movements, setMovements] = useState<Inventory[]>(initialInventory);

  const {
    inventoryMovements,
    isLoadingInventoryMovements,
    inventoryMovementErrors,
    updateInventoryMovementState,
  } = useFetchInventoryMovements();

  const handleEditMovement = (data: { movements: Inventory }) => {
    console.log('Movimiento de inventario actualizado:', data.movements);
  };

  const handleDeleteMovement = (id: number | undefined) => {
    setMovements(movements.filter((event) => event.id !== id));
    console.log('Movimiento de transacción eliminado:', id);
  };

  const openEditMovementModal = (movement: Inventory) => {
    setSelectedInventory(movement);
    setEditInventoryModalOpen(true);
  };

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
      <InventoryTable
        movements={inventoryMovements}
        onEdit={openEditMovementModal}
        onDelete={handleDeleteMovement}
        error={null}
        isLoading={false}
      />

      <EditInventoryModal
        isOpen={isEditInventoryModalOpen}
        onClose={() => setEditInventoryModalOpen(false)}
        inventory={selectedInventory}
        onSubmit={handleEditMovement}
      />
    </Flex>
  );
};
