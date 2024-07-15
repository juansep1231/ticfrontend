import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { formatISO } from 'date-fns';

import { Account } from '../../../../types/finantial-models';
import useFetchAccountingAccounts from '../../../../hooks/financial/fetchAccountingAccountHook';
import useUpdateAccountingAccount, {
  CreateUpdateAccountingAccountDTO,
} from '../../../../hooks/financial/updateAccountingAccountHook';
import usePostAccountingAccount from '../../../../hooks/financial/createAccountingAccounts';

import { AccountTable } from './components/AccountTable';
import { EditAccountModal } from './components/EditAccountModal';
/*
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
];*/
export const AccountPage = () => {
  const [isEditAccountModalOpen, setEditAccountModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [searchAccount, setSearchAccount] = useState('');

  const {
    accountingAccounts,
    isLoadingAccounts,
    accountErrors,
    updateAccountState,
    addAccountState,
  } = useFetchAccountingAccounts();
  const { postAccountingAccount } = usePostAccountingAccount();
  const [accounts, setAccount] = useState<Account[]>(accountingAccounts);
  const { updateAccountingAccount } = useUpdateAccountingAccount();
  const handleEditAccount = async (data: { account: Account }) => {
    //console.log('Cuenta actualizada:', data.account);
    try {
      const formattedDate = formatISO(new Date(data.account.date));
      const updatedInfo: CreateUpdateAccountingAccountDTO = {
        accountName: data.account.accountName,
        accountType: data.account.accountType,
        currentValue: data.account.currentValue,
        initialBalance: data.account.initialBalance!,
        date: formattedDate,
      };

      await updateAccountingAccount(data.account.id!, updatedInfo);

      updateAccountState(data.account.id!, { ...data.account, ...updatedInfo });

      console.log('Updated event information:', data.account);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteAccount = (id: number | undefined) => {
    setAccount(accounts.filter((event) => event.id !== id));
    console.log('Cuenta eliminada:', id);
  };

  const openEditAccountModal = (account: Account) => {
    setSelectedAccount(account);
    setEditAccountModalOpen(true);
  };

  const handleSearchAccountChange = (name: string) => {
    setSearchAccount(name);
  };

  const handleAddAccount = async (newAccount: Account) => {
    try {
      const newAccountCreatedDTO: CreateUpdateAccountingAccountDTO = {
        accountName: newAccount.accountName,
        accountType: newAccount.accountType,
        currentValue: newAccount.currentValue,
        initialBalance: newAccount.currentValue,
        date: formatISO(new Date(newAccount.date)),
      };
      console.log('bueeeeeee', newAccountCreatedDTO);
      const newAccountcreated =
        await postAccountingAccount(newAccountCreatedDTO);

      addAccountState(newAccountcreated);
    } catch (error) {
      console.error('Failed to create account', error);
    }
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
        accounts={accountingAccounts}
        onEdit={openEditAccountModal}
        onDelete={handleDeleteAccount}
        error={accountErrors}
        isLoading={isLoadingAccounts}
        searchAccount={searchAccount}
        onSearchAccountChange={handleSearchAccountChange}
        onAddAccount={handleAddAccount}
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
