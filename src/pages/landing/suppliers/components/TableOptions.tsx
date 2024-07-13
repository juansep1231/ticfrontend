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
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  suppliers: Supplier[];
  searchSupplier: string;
  onSearchSupplierChange: (name: string) => void;
}

export const TableOptions = ({
  suppliers,
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
          value={searchSupplier}
          placeholder="Buscar un proveedor"
          onChange={(e) => onSearchSupplierChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddSupplierModalOpen(true)}
        >
          Proveedor
        </Button>
        <ButtonExcel data={suppliers} />
      </Flex>

      <AddSupplierModal
        isOpen={isAddSupplierModalOpen}
        onClose={() => setIsAddSupplierModalOpen(false)}
        onAddSupplier={handleAddSupplier}
      />
    </Flex>
  );
};
