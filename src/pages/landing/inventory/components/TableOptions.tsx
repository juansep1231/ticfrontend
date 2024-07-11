import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Inventory } from '../../../../types/inventory-models';

import { AddInventoryModal } from './AddInventoryModal';

interface TableOptionsProps {
  searchMovement: string;
  onSearchMovementChange: (name: string) => void;
}

export const TableOptions = ({
  searchMovement: searchMovement,
  onSearchMovementChange: onSearchMovementChange,
}: TableOptionsProps) => {
  const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);

  const handleAddInventory = (newInventory: Inventory) => {
    console.log('Movimiento agregado:', newInventory);
  };

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
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddInventoryModal
        isOpen={isAddInventoryModalOpen}
        onClose={() => setIsAddInventoryModalOpen(false)}
        onAddInventory={handleAddInventory}
      />
    </Flex>
  );
};
