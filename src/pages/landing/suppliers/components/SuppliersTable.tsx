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
import { SUPPLIERS_TABLE_HEADERS } from '../../../../utils/constants';
import { Supplier } from '../../../../types/supplier-models';

import { TableOptions } from './TableOptions';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number | undefined) => void;
}

export const SuppliersTable = ({
  suppliers,
  onEdit,
  onDelete,
}: SuppliersTableProps) => {
  //const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<
    number | undefined
  >();

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedSupplierId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSupplierId !== undefined) {
      onDelete(selectedSupplierId);
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
        searchSupplier={''}
        onSearchSupplierChange={function (name: string): void {
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
              {SUPPLIERS_TABLE_HEADERS.map((header, index) => (
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
            {suppliers.length === 0 ? (
              <Tr>
                <Td colSpan={SUPPLIERS_TABLE_HEADERS.length}>
                  No olvides ingresar eventos
                </Td>
              </Tr>
            ) : (
              suppliers.map((supplier) => (
                <Tr key={supplier.id}>
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
                        onClick={() => onEdit(supplier)}
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
                        onClick={() => handleDeleteClick(supplier.id)}
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
                  <Td>{supplier.name}</Td>
                  <Td>{supplier.phone}</Td>
                  <Td>{supplier.email}</Td>
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
        title="Eliminar proveedor"
        body="¿Estás seguro de que deseas eliminar este proveedor?"
      />
    </Flex>
  );
};
