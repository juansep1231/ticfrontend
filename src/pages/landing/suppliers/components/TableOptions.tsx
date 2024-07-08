import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Supplier } from '../../../../types/supplier-models';
import { AddSupplierModal } from './AddSupplierModal';

interface TableOptionsProps {
  searchSupplier: string;
  onSearchSupplierChange: (name: string) => void;
}

export const TableOptions = ({
  searchSupplier,
  onSearchSupplierChange,
}: TableOptionsProps) => {
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);

  const handleAddSupplier = (newEvent: Supplier) => {
    console.log('Proveedor agregado:', newEvent);
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
          type="text"
          value={searchSupplier}
          placeholder="Buscar un proveedor"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddSupplierModalOpen(true)}
        >
          Proveedor
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddSupplierModal
        isOpen={isAddSupplierModalOpen}
        onClose={() => setIsAddSupplierModalOpen(false)}
        onAddSupplier={handleAddSupplier}
      />
    </Flex>
  );
};
