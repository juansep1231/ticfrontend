import { useState } from 'react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Inventory } from '../../../../types/inventory-models';

import { AddInventoryModal } from './AddInventoryModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  inventories: Inventory[];
  searchMovement: string;
  onSearchMovementChange: (name: string) => void;
  onAddInventory: (inventory: Inventory) => void;
}

export const TableOptions = ({
  inventories,
  searchMovement,
  onSearchMovementChange,
  onAddInventory,
}: TableOptionsProps) => {
  const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);
  return (
    <Flex
      sx={{
        flexDirection: { sm: 'column', lg: 'row' },
        gap: 'md',
        justifyContent: 'space-between',
      }}
    >
      <InputGroup sx={{ width: { sm: '100%', lg: 'md' } }}>
        <InputLeftElement>
          <SearchIcon sx={{ color: 'text.default' }} />
        </InputLeftElement>
        <Input
          value={searchMovement}
          placeholder="Buscar un movimiento de inventario"
          onChange={(e) => onSearchMovementChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddInventoryModalOpen(true)}
        >
          Movimiento
        </Button>
        <ButtonExcel data={inventories} />
      </Flex>

      <AddInventoryModal
        isOpen={isAddInventoryModalOpen}
        onClose={() => setIsAddInventoryModalOpen(false)}
        onAddInventory={onAddInventory}
      />
    </Flex>
  );
};
