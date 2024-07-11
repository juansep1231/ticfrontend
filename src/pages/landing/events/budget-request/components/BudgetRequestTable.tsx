import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Spinner,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { ConfirmationModal } from '../../../../../components/ConfirmationModal';
import { TableOptions } from './TableOptions';
import { BudgetRequest } from '../../../../../types/event-models';
import { useErrorToast } from '../../../../../hooks/general/useErrorToast';
import { budgetRequestFilterByEventName } from '../../../../../utils/filter-helper';
import { BUDGET_REQUEST_TABLE_HEADERS } from '../../../../../utils/constants';
//import { initialEvents } from '../EventPage';

interface BudgetRequestTableProps {
  budgetRequests: BudgetRequest[];
  error: Error | null;
  isLoading: boolean;
  onEdit: (request: BudgetRequest) => void;
  onDelete: (id: number | undefined) => void;
  searchRequest: string;
  onSearchRequestChange: (name: string) => void;
}

export const BudgetRequestTable = ({
  budgetRequests,
  error,
  isLoading,
  onEdit,
  onDelete,
  searchRequest,
  onSearchRequestChange,
}: BudgetRequestTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudgetRequestId, setSelectedBudgetRequestId] = useState<
    number | undefined
  >();
  const [filteredRequests, setFilteredRequests] = useState<BudgetRequest[]>([]);

  useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedBudgetRequestId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBudgetRequestId !== undefined) {
      onDelete(selectedBudgetRequestId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFilteredRequests(
      budgetRequestFilterByEventName(budgetRequests, searchRequest)
    );
  }, [budgetRequests, searchRequest]);

  /*if (isLoading) {
    return <Spinner size="xl" />;
  }*/

  return (
    <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
      <TableOptions
        searchBudgetRequest={searchRequest}
        onSearchBudgetRequestChange={onSearchRequestChange}
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
              {BUDGET_REQUEST_TABLE_HEADERS.map((header, index) => (
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
            {filteredRequests.length === 0 ? (
              <Tr>
                <Td colSpan={BUDGET_REQUEST_TABLE_HEADERS.length + 1}>
                  No olvides ingresar eventos.
                </Td>
              </Tr>
            ) : (
              filteredRequests.map((budgetRequest) => (
                <Tr key={budgetRequest.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Event"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(budgetRequest)}
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
                        onClick={() => handleDeleteClick(budgetRequest.id)}
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
                  <Td>{budgetRequest.eventName}</Td>
                  <Td>{budgetRequest.requestStatusName}</Td>
                  <Td>{budgetRequest.reason}</Td>
                  <Td>{budgetRequest.value}</Td>
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
        title="Eliminar evento"
        body="¿Estás seguro de que deseas eliminar este evento?"
      />
    </Flex>
  );
};
