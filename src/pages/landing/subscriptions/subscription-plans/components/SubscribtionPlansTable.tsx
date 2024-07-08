import React, { useState } from 'react';
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

import { ConfirmationModal } from '../../../../../components/ConfirmationModal';
import { SUBSCRIPTION_PLAN_TABLE_HEADERS } from '../../../../../utils/constants';
import { SubscriptionPlan } from '../../../../../types/subscription-models';

import { TableOptions } from './TableOptions';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface SubscriptionPlanTableProps {
  plans: SubscriptionPlan[];
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (id: number | undefined) => void;
}

export const SubscriptionPlansTable = ({
  plans,
  onEdit,
  onDelete,
}: SubscriptionPlanTableProps) => {
  //const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | undefined>();

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedPlanId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPlanId !== undefined) {
      onDelete(selectedPlanId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
      <TableOptions
        searchPlan={''}
        onSearchPlanChange={function (name: string): void {
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
              {SUBSCRIPTION_PLAN_TABLE_HEADERS.map((header, index) => (
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
            {plans.length === 0 ? (
              <Tr>
                <Td colSpan={SUBSCRIPTION_PLAN_TABLE_HEADERS.length}>
                  No olvides ingresar planes de aportación.
                </Td>
              </Tr>
            ) : (
              plans.map((plan) => (
                <Tr key={plan.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit plan"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(plan)}
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
                        aria-label="Delete plan"
                        icon={<FaTrash size={16} />}
                        onClick={() => handleDeleteClick(plan.id)}
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
                  <Td>{plan.planName}</Td>
                  <Td>{plan.price}</Td>
                  <Td>{plan.benefits}</Td>
                  <Td>{plan.academicPeriod}</Td>
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
        title="Eliminar plan de aportación"
        body="¿Estás seguro de que deseas eliminar este plan de aportantación?"
      />
    </Flex>
  );
};
