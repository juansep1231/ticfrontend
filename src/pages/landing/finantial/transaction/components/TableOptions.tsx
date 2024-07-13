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
import { ButtonExcel } from './ButtonExcel';

import { formatISO } from 'date-fns';
import useFetchTransactions from '../../../../../hooks/financial/fetchTransactionHook';
import usePostTransaction, { CreateUpdateTransactionDTO } from '../../../../../hooks/financial/createTransactionHook';


interface TableOptionsProps {
  transactions: Transaction[];
  searchTransaction: string;
  onSearchTransactionChange: (name: string) => void;
}


export const TableOptions = ({
  transactions,
  searchTransaction,
  onSearchTransactionChange,
}: TableOptionsProps) => {

  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);


    const {
      addTransactionState
    }=  useFetchTransactions();


    const {postTransaction}=usePostTransaction();
  const handleAddTransaction = async (newTransaction: Transaction) => {
   try {
      const formattedDate = formatISO(new Date(newTransaction.date));
      const updatedInfo: CreateUpdateTransactionDTO = {
        date: formattedDate,
        originAccount: newTransaction.originAccount,
        destinationAccount: newTransaction.destinationAccount,
        value: newTransaction.value,
        transactionType: newTransaction.transactionType,
        description: newTransaction.description,

      };
      const newAdminMember = await postTransaction(updatedInfo);

      addTransactionState(newAdminMember);
   
    } catch (error) {
      console.error('Failed to update Event:', error);
    }
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
          value={searchTransaction}
          placeholder="Buscar una transacción"
          onChange={(e) => onSearchTransactionChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddTransactionModalOpen(true)}
        >
          Transacción
        </Button>
        <ButtonExcel data={transactions} />
      </Flex>

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </Flex>
  );
};
