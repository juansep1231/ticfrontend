import { Heading, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Transaction } from '../../../types/finantial-models';

import { TransactionTable } from './components/TransactionTable';
import { EditTransactionModal } from './components/EditTransactionModal';

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-01-01',
    originAccount: 'Cuenta A',
    destinationAccount: 'Cuenta B',
    value: 1000,
    transactionType: 'INGRESO',
    description: 'Pago de servicios',
  },
  {
    id: 2,
    date: '2024-01-02',
    originAccount: 'Cuenta B',
    destinationAccount: 'Cuenta C',
    value: 500,
    transactionType: 'EGRESO',
    description: 'Compra de materiales',
  },
  {
    id: 3,
    date: '2024-01-03',
    originAccount: 'Cuenta A',
    destinationAccount: 'Cuenta D',
    value: 200,
    transactionType: 'INGRESO',
    description: 'Venta de productos',
  },
  {
    id: 4,
    date: '2024-01-04',
    originAccount: 'Cuenta D',
    destinationAccount: 'Cuenta B',
    value: 300,
    transactionType: 'EGRESO',
    description: 'Gastos administrativos',
  },
];

export const FinantialPage = () => {
  const [isEditTransactionModalOpen, setEditTransactionModalOpen] =
    useState(false);
  const [selectedTrasaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const handleEditTransaction = (data: { transaction: Transaction }) => {
    console.log('Transacción actualizado:', data.transaction);
  };

  const handleDeleteTransaction = (id: number | undefined) => {
    setTransactions(transactions.filter((event) => event.id !== id));
    console.log('Transacción eliminado:', id);
  };

  const openEditTransactionModal = (trasaction: Transaction) => {
    setSelectedTransaction(trasaction);
    setEditTransactionModalOpen(true);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Transacciones</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        En este módulo puedes registrar los movimientos de dinero de la
        Federaciones de Estudiantes de la Escuela Politécnica Nacional.
      </Text>
      <TransactionTable
        transactions={transactions}
        onEdit={openEditTransactionModal}
        onDelete={handleDeleteTransaction}
        error={null}
        isLoading={false}
      />

      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onClose={() => setEditTransactionModalOpen(false)}
        transaction={selectedTrasaction}
        onSubmit={handleEditTransaction}
      />
    </Flex>
  );
};
