import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { EventsTable } from './components/EventsTable';
import { EditEventModal } from './components/EditEventModal';
import { EventView } from '../../../types/event-models';

export const initialEvents: EventView[] = [
  {
    id: 1,
    title: 'Conferencia de Tecnología',
    description: 'Una conferencia sobre las últimas tendencias en tecnología.',
    startDate: '2024-08-01',
    endDate: '2024-08-02',
    budget: 5000,
    budgetStatus: 'EN REVISIÓN',
    location: 'Centro de Convenciones',
    provider: 'Proveedor1',
    status: 'FINALIZADO',
    income: 8000,
  },
  {
    id: 2,
    title: 'Taller de Desarrollo Web',
    description: 'Un taller intensivo sobre desarrollo web moderno.',
    startDate: '2024-09-10',
    endDate: '2024-09-11',
    budget: 3000,
    budgetStatus: 'APROBADO',
    location: 'Sala de Conferencias',
    provider: 'Proveedor2',
    status: 'APROBADO',
  },
  {
    id: 3,
    title: 'Seminario de Marketing Digital',
    description: 'Seminario sobre estrategias avanzadas de marketing digital.',
    startDate: '2024-10-05',
    endDate: '2024-10-06',
    budget: 4000,
    budgetStatus: 'EN REVISIÓN',
    location: 'Hotel Central',
    provider: 'Proveedor3',
    status: 'FINALIZADO',
    income: 6000,
  },
  {
    id: 4,
    title: 'Hackathon 2024',
    description: 'Competencia de programación de 48 horas.',
    startDate: '2024-11-15',
    endDate: '2024-11-17',
    budget: 7000,
    budgetStatus: 'APROBADO',
    location: 'Centro Tecnológico',
    provider: 'Proveedor1',
    status: 'EN PROGRESO',
  },
];

export const EventsPage = () => {
  const [isEditEventModalOpen, setEditEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventView | null>(null);
  const [events, setEvents] = useState<EventView[]>(initialEvents);

  const handleEditEvent = (data: { event: EventView }) => {
    console.log('Miembro actualizado:', data.event);
  };

  const handleDeleteEvent = (id: number | undefined) => {
    setEvents(events.filter((event) => event.id !== id));
    console.log('Evento eliminado:', id);
  };

  const openEditEventModal = (event: EventView) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Eventos</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Antes de añadir un evento, asegúrate de que el proveedor ya se encuentre
        registrado. En caso de no estar seguro revisa los
        <Link href="/proveedores" sx={{ color: 'brand.blue', ml: '3xs' }}>
          proveedores disponibles.
        </Link>
      </Text>
      <EventsTable
        events={events}
        onEdit={openEditEventModal}
        onDelete={handleDeleteEvent}
      />

      <EditEventModal
        isOpen={isEditEventModalOpen}
        onClose={() => setEditEventModalOpen(false)}
        event={selectedEvent}
        onSubmit={handleEditEvent}
      />
    </Flex>
  );
};
