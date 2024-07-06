import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Flex,
  Spinner,
} from '@chakra-ui/react';

import { FaTrash, FaEdit } from 'react-icons/fa';
import { ConfirmationModal } from '../../../components/ConfirmationModal'; // Importa el componente del modal
import { useErrorToast } from '../../../hooks/useErrorToast'; // Importa el hook de error
import { useFetchData } from '../../../hooks/exampleHook'; // Importa el hook de datos

import { OrganizationalInfo } from '../../../types/organizational-models';

interface InformationTableProps {
  url: string;
  onEdit: (info: OrganizationalInfo) => void;
  onDelete: (id: number | undefined) => void;
}

export const InformationTable = ({
  url,
  onEdit,
  onDelete,
}: InformationTableProps) => {
  const { data: info, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState<number | undefined>();

  useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedInfoId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedInfoId !== undefined) {
      onDelete(selectedInfoId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      <TableContainer sx={{ width: '100%' }}>
        <Table
          variant="simple"
          sx={{
            'border': '1px solid',
            'borderColor': 'brand.blue',
            'borderCollapse': 'center',
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
                  width: '20',
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              ></Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Misión
              </Th>
              <Th
                sx={{
                  borderLeft: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Visión
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {info.length === 0 ? (
              <Tr>
                <Td colSpan={3}>
                  No olvides ingresar la información organizacional
                </Td>
              </Tr>
            ) : (
              info.map((inf) => (
                <Tr key={inf.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Information"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(inf)}
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
                        aria-label="Delete Information"
                        icon={<FaTrash size={16} />}
                        onClick={() => handleDeleteClick(inf.id)}
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
                  <Td>{inf.mission}</Td>
                  <Td>{inf.vision}</Td>
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
        title="Eiminar información"
        body="¿Está seguro de eliminar esta información?"
      />
    </>
  );
};

export default InformationTable;
