import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
} from '@chakra-ui/react';

import { ConfirmationModal } from '../../../../../components/ConfirmationModal';
import { SUBSCRIPTION_PLAN_TABLE_HEADERS } from '../../../../../utils/constants';

import { TableOptions } from './TableOptions';

export const SubscriptionPlansTable = () => {
  //const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
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
          <Tbody></Tbody>
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
