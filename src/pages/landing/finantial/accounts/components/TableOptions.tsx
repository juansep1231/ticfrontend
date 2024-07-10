import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Account } from '../../../../../types/finantial-models';
import { AddAccountModal } from './AddAccountModal';

interface TableOptionsProps {
  searchAccount: string;
  onSearchAccountChange: (name: string) => void;
}

export const TableOptions = ({
  searchAccount,
  onSearchAccountChange,
}: TableOptionsProps) => {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  const handleAddAccount = (newAccount: Account) => {
    console.log('Cuenta agregada:', newAccount);
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
          value={searchAccount}
          placeholder="Buscar una cuenta contable"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddAccountModalOpen(true)}
        >
          Cuenta
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAddAccount={handleAddAccount}
      />
    </Flex>
  );
};
