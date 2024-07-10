import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Transaction } from '../../../../../types/finantial-models';
import { AddTransactionModal } from './AddTransactionModal';

interface TableOptionsProps {
  searchTransaction: string;
  onSearchTransactionChange: (name: string) => void;
}

export const TableOptions = ({
  searchTransaction: searchTransaction,
  onSearchTransactionChange: onSearchTransactionChange,
}: TableOptionsProps) => {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);

  const handleAddTransaction = (newTransaction: Transaction) => {
    console.log('Transacción agregada:', newTransaction);
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
          value={searchTransaction}
          placeholder="Buscar una transacción"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddTransactionModalOpen(true)}
        >
          Transacción
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </Flex>
  );
};
