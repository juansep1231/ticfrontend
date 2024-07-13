import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { InventoryTable } from './components/InventoryTable';
import { useState } from 'react';
import { Inventory } from '../../../types/inventory-models';
import { EditInventoryModal } from './components/EditInventoryModal';
import { useFetchInventoryMovements } from '../../../hooks/inventory/fetchInventoryHook';
import { format, formatISO, parseISO } from 'date-fns';
import useUpdateInventoryMovement, {
  CreateUpdateInventoryMovementDTO,
} from '../../../hooks/inventory/updateInventoryHook';
import usePatchInventoryMovementState from '../../../hooks/inventory/patchInventoryHook';
import { or } from 'firebase/firestore';

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
  const [searchInventory, setSearchInventory] = useState('');
  const { updateInventoryMovement, updateError } = useUpdateInventoryMovement();
  const {
    inventoryMovements,
    isLoadingInventoryMovements,
    inventoryMovementErrors,
    updateInventoryMovementState,
  } = useFetchInventoryMovements();

  const { patchInventoryMovementState, patchError } = usePatchInventoryMovementState();
  const handleEditMovement = async (data: { movements: Inventory }) => {
    try {
      const formattedDate = formatISO(new Date(data.movements.date));
      const updatedInfo: CreateUpdateInventoryMovementDTO = {
        date: formattedDate,
        product_Name: data.movements.product,
        inventory_Movement_Type_Name: data.movements.movementType,
        quantity: data.movements.quantity,
      };

      const originalFormattedDate = format(parseISO(data.movements.date), 'dd/MM/yyyy');

      await updateInventoryMovement(data.movements.id!, updatedInfo);

      updateInventoryMovementState(data.movements.id!, {
        ...data.movements,
        ...updatedInfo,
        date: originalFormattedDate,
      });

      console.log('Updated organizational information:', data.movements);
    } catch (error) {
      console.error('Failed to update association:', error);
    }
  };

  const handleDeleteMovement = async (id: number | undefined) => {
    try {
      await patchInventoryMovementState(id!);
      updateInventoryMovementState(id!, { stateid: 2 });
      console.log('Aportante eliminado:', id);
    } catch (error) {
      console.error('Failed to update association state:', error);
    }
  };

  const openEditMovementModal = (movement: Inventory) => {
    setSelectedInventory(movement);
    setEditInventoryModalOpen(true);
  };

  const handleSearchInventoryChange = (name: string) => {
    setSearchInventory(name);
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
        error={inventoryMovementErrors}
        isLoading={isLoadingInventoryMovements}
        searchInventory={searchInventory}
        onSearchInventoryChange={handleSearchInventoryChange}
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
