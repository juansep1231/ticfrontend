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
import { SUBSCRIBER_TABLE_HEADERS } from '../../../../../utils/constants';
import { Subscriber } from '../../../../../types/subscription-models';

import { TableOptions } from './TableOptions';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface SubscribersTableProps {
  subscribers: Subscriber[];
  onEdit: (subscriber: Subscriber) => void;
  onDelete: (id: number | undefined) => void;
}

export const SubscribersTable = ({
  subscribers,
  onEdit,
  onDelete,
}: SubscribersTableProps) => {
  //const { data: members, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriberId, setSelectedSubscriberId] = useState<
    number | undefined
  >();

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedSubscriberId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSubscriberId !== undefined) {
      onDelete(selectedSubscriberId);
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
        searchSubscriber={''}
        onSearchSubscriberChange={function (name: string): void {
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
              {SUBSCRIBER_TABLE_HEADERS.map((header, index) => (
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
            {subscribers.length === 0 ? (
              <Tr>
                <Td colSpan={SUBSCRIBER_TABLE_HEADERS.length}>
                  No olvides ingresar aportantes.
                </Td>
              </Tr>
            ) : (
              subscribers.map((subscriber) => (
                <Tr key={subscriber.id}>
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
                        onClick={() => onEdit(subscriber)}
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
                        onClick={() => handleDeleteClick(subscriber.id)}
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
                  <Td>{subscriber.date}</Td>
                  <Td>{subscriber.name}</Td>
                  <Td>{subscriber.faculty}</Td>
                  <Td>{subscriber.career}</Td>
                  <Td>{subscriber.email}</Td>
                  <Td>{subscriber.plan}</Td>
                  <Td>{subscriber.price}</Td>
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
        title="Eliminar aportante"
        body="¿Estás seguro de que deseas eliminar este aportante?"
      />
    </Flex>
  );
};
