import { useState } from 'react';
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
} from '@chakra-ui/react';

import { ConfirmationModal } from '../../../../components/ConfirmationModal';
import { TRANSACTION_TABLE_HEADERS } from '../../../../utils/constants';
import { Transaction } from '../../../../types/finantial-models';

import { TableOptions } from './TableOptions';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number | undefined) => void;
}

export const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
}: TransactionTableProps) => {
  //const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | undefined
  >();

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTransactionId !== undefined) {
      onDelete(selectedTransactionId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /*if (isLoading) {
    return <Spinner size="xl" />;
  }*/

  return (
    <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
      <TableOptions
        searchTransaction={''}
        onSearchTransactionChange={function (name: string): void {
          throw new Error('Function not implemented.');
        }}
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
              {TRANSACTION_TABLE_HEADERS.map((header, index) => (
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
            {transactions.length === 0 ? (
              <Tr>
                <Td colSpan={TRANSACTION_TABLE_HEADERS.length}>
                  No olvides ingresar eventos
                </Td>
              </Tr>
            ) : (
              transactions.map((transaction) => (
                <Tr key={transaction.id}>
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
                        onClick={() => onEdit(transaction)}
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
                        onClick={() => handleDeleteClick(transaction.id)}
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
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.originAccount}</Td>
                  <Td>{transaction.destinationAccount}</Td>
                  <Td>{transaction.value}</Td>
                  <Td>{transaction.transactionType}</Td>
                  <Td>{transaction.description}</Td>
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
        title="Eliminar transacción"
        body="¿Estás seguro de que deseas eliminar esta transacción?"
      />
    </Flex>
  );
};
