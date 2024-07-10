import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { useState } from 'react';

import { Account } from '../../../../types/finantial-models';

import { AccountTable } from './components/AccountTable';
import { EditAccountModal } from './components/EditAccountModal';

export const initialAccounts: Account[] = [
  {
    id: 1,
    accountType: 'Savings',
    accountName: 'Personal Savings',
    currentValue: 15000.0,
    date: '2024-01-01',
  },
  {
    id: 2,
    accountType: 'Checking',
    accountName: 'Business Checking',
    currentValue: 25000.0,
    date: '2024-01-02',
  },
  {
    id: 3,
    accountType: 'Investment',
    accountName: 'Retirement Fund',
    currentValue: 75000.0,
    date: '2024-01-03',
  },
  {
    id: 4,
    accountType: 'Savings',
    accountName: 'Emergency Fund',
    currentValue: 10000.0,
    date: '2024-01-04',
  },
  {
    id: 5,
    accountType: 'Checking',
    accountName: 'Household Expenses',
    currentValue: 5000.0,
    date: '2024-01-05',
  },
  {
    id: 6,
    accountType: 'Investment',
    accountName: 'Stock Portfolio',
    currentValue: 120000.0,
    date: '2024-01-06',
  },
];
export const AccountPage = () => {
  const [isEditAccountModalOpen, setEditAccountModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accounts, setAccount] = useState<Account[]>(initialAccounts);

  const handleEditAccount = (data: { account: Account }) => {
    console.log('Cuenta actualizada:', data.account);
  };

  const handleDeleteAccount = (id: number | undefined) => {
    setAccount(accounts.filter((event) => event.id !== id));
    console.log('Cuenta eliminada:', id);
  };

  const openEditAccountModal = (account: Account) => {
    setSelectedAccount(account);
    setEditAccountModalOpen(true);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Cuentas Contables</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Ahora que añadiste las cuentas contables necesarias, ya puedes
        <Link
          href="/finanzas/transacciones"
          sx={{ color: 'brand.blue', mx: '3xs' }}
        >
          registrar tus transacciones.
        </Link>
      </Text>
      <AccountTable
        accounts={accounts}
        onEdit={openEditAccountModal}
        onDelete={handleDeleteAccount}
        error={null}
        isLoading={false}
      />

      <EditAccountModal
        isOpen={isEditAccountModalOpen}
        onClose={() => setEditAccountModalOpen(false)}
        account={selectedAccount}
        onSubmit={handleEditAccount}
      />
    </Flex>
  );
};
