import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { EventsTable } from './components/EventsTable';
import { EditEventModal } from './components/EditEventModal';
import { EventView } from '../../../types/event-models';
import useFetchEvents from '../../../hooks/Events/fetchEventHook';
import { formatISO } from 'date-fns';
import useUpdateEvent, { CreateUpdateEventDTO } from '../../../hooks/Events/updateEventhook';
/*
export const initialEvents: EventView[] = [
  {
    id: 1,
    title: 'Conferencia de Tecnología',
    status: 'FINALIZADO',
    description: 'Una conferencia sobre las últimas tendencias en tecnología.',
    startDate: '2024-08-01',
    endDate: '2024-08-02',
    budget: 5000,
    budgetStatus: 'EN REVISIÓN',
    location: 'Centro de Convenciones',
    income: 8000,
  },
  {
    id: 2,
    title: 'Taller de Desarrollo Web',
    status: 'APROBADO',
    description: 'Un taller intensivo sobre desarrollo web moderno.',
    startDate: '2024-09-10',
    endDate: '2024-09-11',
    budget: 3000,
    budgetStatus: 'APROBADO',
    location: 'Sala de Conferencias',
  },
  {
    id: 3,
    title: 'Seminario de Marketing Digital',
    status: 'FINALIZADO',
    description: 'Seminario sobre estrategias avanzadas de marketing digital.',
    startDate: '2024-10-05',
    endDate: '2024-10-06',
    budget: 4000,
    budgetStatus: 'EN REVISIÓN',
    location: 'Hotel Central',
    income: 6000,
  },
  {
    id: 4,
    title: 'Hackathon 2024',
    status: 'EN PROGRESO',
    description: 'Competencia de programación de 48 horas.',
    startDate: '2024-11-15',
    endDate: '2024-11-17',
    budget: 7000,
    budgetStatus: 'APROBADO',
    location: 'Centro Tecnológico',
  },
];

*/

export const EventsPage = () => {
  const [isEditEventModalOpen, setEditEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventView | null>(null);
  //const [events, setEvents] = useState<EventView[]>(initialEvents);
  const [searchEvent, setSearchEvent] = useState('');

  const {updateEvent, updateError}= useUpdateEvent();
  const  handleEditEvent = async (data: { event: EventView }) => {
    try {
      const formattedDate = formatISO(new Date(data.event.startDate));
      const formattedDate2 = formatISO(new Date(data.event.endDate));
      const updatedInfo: CreateUpdateEventDTO = {
        title: data.event.title,
        status: data.event.status,
        description: data.event.description,
        startDate: formattedDate,
        endDate: formattedDate2,
        budget: data.event.budget,
        budgetStatus: data.event.budgetStatus,
        location: data.event.location,
        income: data.event.income,
      };

      await updateEvent(data.event.id!,updatedInfo);

      updateEventState(data.event.id!, { ...data.event, ...updatedInfo });

      console.log('Updated event information:', data.event);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const { events, isLoadingEvents, eventErrors,updateEventState } = useFetchEvents();
  


  const handleDeleteEvent = (id: number | undefined) => {
    (events.filter((event) => event.id !== id));
    console.log('Evento eliminado:', id);
  };

  const openEditEventModal = (event: EventView) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  const handleSearchEventChange = (name: string) => {
    setSearchEvent(name);
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
        error={eventErrors}
        isLoading={isLoadingEvents}
        searchEvent={searchEvent}
        onSearchEventChange={handleSearchEventChange}
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
