import { useState } from 'react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Account } from '../../../../../types/finantial-models';

import { AddAccountModal } from './AddAccountModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  accounts: Account[];
  searchAccount: string;
  onSearchAccountChange: (name: string) => void;
  onAddAccount: (account: Account) => void;
}

export const TableOptions = ({
  accounts,
  searchAccount,
  onSearchAccountChange,
  onAddAccount,
}: TableOptionsProps) => {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

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
          value={searchAccount}
          placeholder="Buscar una cuenta contable"
          onChange={(e) => onSearchAccountChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddAccountModalOpen(true)}
        >
          Cuenta
        </Button>
        <ButtonExcel data={accounts} />
      </Flex>

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAddAccount={onAddAccount}
      />
    </Flex>
  );
};
