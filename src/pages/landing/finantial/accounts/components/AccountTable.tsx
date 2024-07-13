import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Td,
  IconButton,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { ConfirmationModal } from '../../../../../components/ConfirmationModal';
import { ACCOUNT_TABLE_HEADERS } from '../../../../../utils/constants';
import { Account } from '../../../../../types/finantial-models';
import { accountFilterByName } from '../../../../../utils/filter-helper';
import { useErrorToast } from '../../../../../hooks/general/useErrorToast';

import { TableOptions } from './TableOptions';

interface AccountTableProps {
  accounts: Account[];
  error: Error | null;
  isLoading: boolean;
  onEdit: (account: Account) => void;
  onDelete: (id: number | undefined) => void;
  searchAccount: string;
  onSearchAccountChange: (name: string) => void;
  onAddAccount: (account: Account) => void;
}

export const AccountTable = ({
  accounts,
  error,
  isLoading,
  onEdit,
  onDelete,
  searchAccount,
  onSearchAccountChange,
  onAddAccount,
}: AccountTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<
    number | undefined
  >();
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);

  useEffect(() => {
    setFilteredAccounts(accountFilterByName(accounts, searchAccount));
  }, [accounts, searchAccount]);

  useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedAccountId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAccountId !== undefined) {
      onDelete(selectedAccountId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <Center sx={{ width: '100vw' }}>
        <Spinner size="xl" sx={{ color: 'brand.blue' }} />
      </Center>
    );
  }

  return (
    <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
      <TableOptions
        accounts={accounts}
        searchAccount={searchAccount}
        onSearchAccountChange={onSearchAccountChange}
        onAddAccount={onAddAccount}
      />
      <TableContainer>
        <Table
          variant="simple"
          sx={{
            'border': '1px solid',
            'borderColor': 'brand.blue',
            'borderCollapse': 'collapse',
            'width': '100%',
            'textColor': 'surface.default',
            'fontSize': 'text.md',
            '& th, & td': {
              textColor: 'text.default',
              fontSize: 'text.md',
              textAlign: 'center',
            },
            '& th': {
              bg: 'brand.blue',
              textColor: 'white',
              height: '58px',
            },
            '& td': {
              border: '1px solid',
              borderColor: 'brand.blue',
            },
          }}
        >
          <Thead>
            <Tr sx={{ textColor: 'surface.default' }}>
              <Th
                sx={{
                  borderRight: '1px',
                  width: '20',
                }}
              ></Th>
              {ACCOUNT_TABLE_HEADERS.map((header, index) => (
                <Th
                  key={index}
                  sx={{
                    borderRight: '1px',
                    borderColor: 'primary.100',
                  }}
                >
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredAccounts.length === 0 ? (
              <Tr>
                <Td colSpan={ACCOUNT_TABLE_HEADERS.length + 1}>
                  No olvides ingresar cuentas contables.
                </Td>
              </Tr>
            ) : (
              filteredAccounts.map((account) => (
                <Tr key={account.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Transaction"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(account)}
                        size="sm"
                        sx={{
                          bg: 'none',
                          color: 'brand.blue',
                          _hover: {
                            bg: 'secondary.100',
                            color: 'primary.default',
                          },
                        }}
                      />
                      <IconButton
                        aria-label="Delete Event"
                        icon={<FaTrash size={16} />}
                        onClick={() => handleDeleteClick(account.id)}
                        size="sm"
                        sx={{
                          bg: 'none',
                          color: 'brand.blue',
                          _hover: {
                            bg: 'secondary.100',
                            color: 'primary.default',
                          },
                        }}
                      />
                    </Flex>
                  </Td>
                  <Td>{account.accountType}</Td>
                  <Td>{account.accountName}</Td>
                  <Td>{account.currentValue}</Td>
                  <Td>{account.date}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar cuenta contable"
        body="¿Estás seguro de que deseas eliminar esta cuenta contable?"
      />
    </Flex>
  );
};
