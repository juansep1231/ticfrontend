import React, { useState } from 'react';
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

import { EVENTS_TABLE_HEADERS } from '../../../../utils/constants';
import { ConfirmationModal } from '../../../../components/ConfirmationModal';
import { useErrorToast } from '../../../../hooks/general/useErrorToast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { EventView } from '../../../../types/event-models';
import { useFetchData } from '../../../../hooks/general/exampleHook';

import { TableOptions } from './TableOptions';

interface EventTableProps {
  events: EventView[];
  error: Error | null;
  isLoading: boolean;
  onEdit: (event: EventView) => void;
  onDelete: (id: number | undefined) => void;
}

export const EventsTable = ({
  events,
  error,
  isLoading,
  onEdit,
  onDelete,
}: EventTableProps) => {
  //const { data: events, isLoading, error } = useFetchData(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | undefined>();

  //useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEventId !== undefined) {
      onDelete(selectedEventId);
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
        searchEvent={''}
        onSearchEventChange={function (name: string): void {
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
              {EVENTS_TABLE_HEADERS.map((header, index) => (
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
            {events.length === 0 ? (
              <Tr>
                <Td colSpan={EVENTS_TABLE_HEADERS.length + 1}>
                  No olvides ingresar eventos.
                </Td>
              </Tr>
            ) : (
              events.map((event) => (
                <Tr key={event.id}>
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
                        onClick={() => onEdit(event)}
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
                        onClick={() => handleDeleteClick(event.id)}
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
                  <Td>{event.title}</Td>
                  <Td>{event.description}</Td>
                  <Td>{event.startDate}</Td>
                  <Td>{event.endDate}</Td>
                  <Td>{event.budget}</Td>
                  <Td>{event.budgetStatus}</Td>
                  <Td>{event.location}</Td>
                  <Td>{event.provider}</Td>
                  <Td>{event.status}</Td>
                  <Td>{event.income}</Td>
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

export default EventsTable;
