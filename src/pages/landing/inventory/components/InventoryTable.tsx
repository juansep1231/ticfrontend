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

import { ConfirmationModal } from '../../../../components/ConfirmationModal';
import { Inventory } from '../../../../types/inventory-models';
import { INVENTORY_TABLE_HEADERS } from '../../../../utils/constants';

import { TableOptions } from './TableOptions';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface InventoryTableProps {
  movements: Inventory[];
  error: Error | null;
  isLoading: boolean;
  onEdit: (movement: Inventory) => void;
  onDelete: (id: number | undefined) => void;
}

export const InventoryTable = ({
  movements,
  error,
  isLoading,
  onEdit,
  onDelete,
}: InventoryTableProps) => {
  //const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovementId, setSelectedMovementId] = useState<
    number | undefined
  >();

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedMovementId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMovementId !== undefined) {
      onDelete(selectedMovementId);
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
        searchMovement={''}
        onSearchMovementChange={function (name: string): void {
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
              {INVENTORY_TABLE_HEADERS.map((header, index) => (
                <Th
                  key={index}
                  sx={{
                    borderRight: '1px',
                  }}
                >
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {movements.length === 0 ? (
              <Tr>
                <Td colSpan={INVENTORY_TABLE_HEADERS.length}>
                  No olvides ingresar eventos
                </Td>
              </Tr>
            ) : (
              movements.map((movment) => (
                <Tr key={movment.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Movement"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(movment)}
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
                        aria-label="Delete Movement"
                        icon={<FaTrash size={16} />}
                        onClick={() => handleDeleteClick(movment.id)}
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
                  <Td>{movment.product}</Td>
                  <Td>{movment.movementType}</Td>
                  <Td>{movment.quantity}</Td>
                  <Td>{movment.date}</Td>
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
        title="Eliminar movimiento"
        body="¿Estás seguro de que deseas eliminar este movimiento de inventario?"
      />
    </Flex>
  );
};
