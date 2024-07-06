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
import { Member } from '../../../types/organizational-models';

interface AdminMembersTableProps {
  url: string;
  onEdit: (member: Member) => void;
  onDelete: (id: number | undefined) => void;
}

export const AdminMembersTable = ({
  url,
  onEdit,
  onDelete,
}: AdminMembersTableProps) => {
  const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<
    number | undefined
  >();

  useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedMemberId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMemberId !== undefined) {
      onDelete(selectedMemberId);
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
                Rol
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Nombre
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Apellido
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Fecha de Nacimiento
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Número de Celular
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Facultad
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Carrera
              </Th>
              <Th
                sx={{
                  borderRight: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Semestre
              </Th>
              <Th
                sx={{
                  borderLeft: '1px',
                  borderColor: 'primary.100',
                }}
              >
                Correo Institucional
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {members.length === 0 ? (
              <Tr>
                <Td colSpan={10}>
                  No olvides ingresar miembros administrativos
                </Td>
              </Tr>
            ) : (
              members.map((member) => (
                <Tr key={member.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Member"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(member)}
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
                        aria-label="Delete Member"
                        icon={<FaTrash size={16} />}
                        onClick={() => handleDeleteClick(member.id)}
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
                  <Td>{member.position}</Td>
                  <Td>{member.firstName}</Td>
                  <Td>{member.lastName}</Td>
                  <Td>{member.birthDate}</Td>
                  <Td>{member.cellphone}</Td>
                  <Td>{member.faculty}</Td>
                  <Td>{member.career}</Td>
                  <Td>{member.semester}</Td>
                  <Td>{member.email}</Td>
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
        title="Eliminar información"
        body="¿Estás seguro de que deseas eliminar este miembro?"
      />
    </>
  );
};
